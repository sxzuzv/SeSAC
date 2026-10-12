from PIL import Image

image = Image.open("haem.jpg")
image.show()

# STEP ❶. 이미지 열기와 기본 정보 확인
print("이미지 크기:", image.size)
print("이미지 모드:", image.mode)
print("이미지 형식:", image.format)

# STEP ❷. 이미지 크기 변경
resized = image.resize((640, 640))

resized.save("resizedhaem.jpg")
resized.show()

# STEP ❸. 이미지 자르기
cropped = image.crop((300, 200, 900, 700))

cropped.save("croppedhaem.jpg")
cropped.show()

# STEP ❹. 컬러 이미지를 흑백으로 전환
gray_image = image.convert("L")

gray_image.save("grayhaem.jpg")
gray_image.show()