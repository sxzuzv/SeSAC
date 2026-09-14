import streamlit as st
from PIL import Image

# 웹 페이지 제목
st.title("이미지 변환 실습")

# 설명 문구
st.write("이미지를 업로드하면 원본 이미지와 흑백 이미지를 확인할 수 있습니다.")

# 이미지 파일 업로드
uploaded_file = st.file_uploader(
    "이미지를 선택하세요.",
    type = ["jpg", "jpeg", "png"]
)

# 이미지가 업로드된 경우 실행
if uploaded_file is not None:
    # 업로드된 파일을 PIL 이미지 객체로 변환
    image = Image.open(uploaded_file)

    # 원본 이미지 표시
    st.subheader("원본 이미지")
    st.image(image)

        # 이미지 기본 정보 출력
    st.write("이미지 크기:", image.size)
    st.write("이미지 모드:", image.mode)

    # 흑백 이미지로 변환
    gray_image = image.convert("L")

    # 흑백 이미지 표시
    st.subheader("Grayscale 이미지")
    st.image(gray_image)