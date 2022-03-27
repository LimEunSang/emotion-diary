import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  // Diary page 를 렌더할 때 title 변경하기
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    // 문서 객체에서 "title" 이라는 tag name 을 갖는 모든 element 를 가져오는 코드 (배열로 반환)
    // 배열로 반환받은 객체의 0번째 요소를 참조하면 (title tag 는 하나만 존재하므로) = "감정 일기장"

    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
