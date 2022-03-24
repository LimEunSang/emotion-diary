const MyButton = ({ text, type, onClick }) => {
  const bntType = ["positive", "negative"].includes(type) ? type : "default";
  // 정의되지 않은 type 을 전달받으면 default 로 저장

  return (
    <button
      className={["MyButton", `MyButton_${bntType}`].join(" ")}
      // className = 배열의 요소와 요소를 join 으로 이어붙인 string
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
