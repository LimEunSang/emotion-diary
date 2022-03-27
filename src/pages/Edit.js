import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  // targetDiary 를 관리할 state
  const [originData, setOriginData] = useState();

  // 경로 이동을 위한 navigate
  const navigate = useNavigate();

  // url 으로 전달한 변수(Path variable)를 저장
  const { id } = useParams();

  // App.js 에서 전달한 데이터를 전달 받는 useContext
  const diaryList = useContext(DiaryStateContext);

  // Diary page 를 렌더할 때 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    // 문서 객체에서 "title" 이라는 tag name 을 갖는 모든 element 를 가져오는 코드 (배열로 반환)
    // 배열로 반환받은 객체의 0번째 요소를 참조하면 (title tag 는 하나만 존재하므로) = "감정 일기장"

    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  // diaryList 에서 id 와 일치하는 일기 정보를 불러오는 작업 -> Edit 컴포넌트가 mount 됐을 때 수행
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        // 홈으로 이동, 뒤로 가기(없는 diary page 이동) 막기
        navigate("/", { replace: true });
      }
      // !! undefine 일 때는 falsy 한 값을 그렇지 않으면 truthy 한 값을 반환
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
      {/* originData 가 존재할 때만 DiaryEditor 을 렌더 */}
    </div>
  );
};

export default Edit;
