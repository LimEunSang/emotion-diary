import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  // App.js 에서 전달한 데이터를 전달 받는 useContext
  const diaryList = useContext(DiaryStateContext);

  // url 으로 전달한 변수(Path variable)를 저장
  const { id } = useParams();

  // 없는 id 를 전달받을 때 페이지를 홈으로 이동시키기 위한 navigate
  const navigate = useNavigate();

  // targetDiary 정보를 관리할 useState
  const [data, setData] = useState();

  // Diary page 를 렌더할 때 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    // 문서 객체에서 "title" 이라는 tag name 을 갖는 모든 element 를 가져오는 코드 (배열로 반환)
    // 배열로 반환받은 객체의 0번째 요소를 참조하면 (title tag 는 하나만 존재하므로) = "감정 일기장"

    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);

  // diaryList 에서 id 와 일치하는 일기 정보를 불러오는 작업
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        // 홈으로 이동, 뒤로 가기(없는 diary page 이동) 막기
        navigate("/", { replace: true });
      }
      // !! undefine 일 때는 falsy 한 값을 그렇지 않으면 truthy 한 값을 반환
    }
  }, [id, diaryList]);

  // if (데이터가 존재하지 않을 때) else (데이터가 존재할 때)
  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    // emotionList 를 통해서 현재 data 의 emotion 을 불러오는 코드
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
