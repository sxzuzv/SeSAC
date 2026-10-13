# Git
## init
- `.git` 폴더를 생성한다. (숨김 폴더)
- Git repository 초기화 = 빈 사진첩을 만든다.
```
git init
```

## status
- 현재 폴더의 git 작업 상태 확인
```
git status
```
## add
- Staging Area에 작업 내용을 올린다. (무대에 올린다.)
```
git add <filename>
```
- 여러 개의 작업 내용을 한 번에 add
```
git add <filename1> <filename2> <filename3> ...
git add . # 현재 위치에 있는 내용을 한 번에 올린다.
```

## commit
- `.git` repository에 저장한다. = 스냅샷(Snapshot, 사진)을 찍는다.
    - **기존 사진과 현재 사진의 차이를 비교**해 트래킹한다.
```
git commit -m "message"
```

### 최근 커밋 메시지 수정
```
git commit --amend -m "fix message"
```

## log
- git 히스토리를 출력한다.
```
git log
git log --oneline # 핵심 정보만 출력
```

## remote
- 원격 저장소 주소를 별명(origin)을 붙여 추가한다.
```
git remote add origin <경로>
```

## push
- 원격 저장소에 업로드한다.
```
git push origin <브랜치명>
```

## restore
- 수정을 취소한다. = add 된 항목들을 취소한다.
    - commit 이전에만 가능한 동작임에 유의 (무대 위에서 작업물을 내린다.)
```
git restore <filename>
git restore .
git restore --staged <filename>
```