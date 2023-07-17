# Devops-04-S1-Team6-1

서버 사용법
1. git clone하여 레포지토리를 클론
2. npm install을 하여 dependency를 설치
3. npm run dev 명령어로 서버 실행


API 사용법
1. /getToken에서 params로 student_id:{id}, 혹은 instructor_id:{id}를 붙여서 GET 해야됨<br>
해당 params 내용으로 jwt 토큰이 생성되어 출력된다.
![alt text](./RESULT/student_id%20%ED%86%A0%ED%81%B0%EC%83%9D%EC%84%B1.png)
params에 student_id:1로 토큰생성

<br><br>

2. /course에서 모든 수업 조회가능(GET) <br>
쿼리스트링으로 특정 수업 조회 가능<br>
가능한 쿼리 스트링
- instructor_id={id}
- course_name={name}
- course_type={type}
<br><br>

3. /registration에서 수강신청 가능(POST)<br>
수강 신청을 위해서 1.에서 student_id로 만든 토큰 필요<br>
토큰을 디코딩해서 해당 내용들을 사용하기 때문에 student_id로 만든 토큰이 아니면 오류 발생<br>
토큰을 pos제tman에서 authorization 탭에서 bearer로 1.에서 리턴받은 토큰을 삽입하여 통신![alt text](./RESULT/student_id%3D1%EC%9D%B8%EA%B2%BD%EC%9A%B0/student1%20%EC%88%98%EA%B0%95%EC%8B%A0%EC%B2%AD1.png)

<br><br>

4. /registration에서 수강신청한 내용 조회가능(GET)<br>
수강 신청내용 조회을 위해서 1.에서 student_id로 만든 토큰 필요<br>
![alt text](./RESULT/stuent_id%3D4%EC%9D%B8%EA%B2%BD%EC%9A%B0/Student4%20%EC%8B%A0%EC%B2%AD%EB%82%B4%EC%97%AD%20%EC%A1%B0%ED%9A%8C.png)

<br><br>

5. /registration에서 수강신청한 내용 취소가능(DELETE)<br>
수강 신청내용 삭제을 위해서 1.에서 student_id로 만든 토큰 필요<br>
![alt text](./RESULT/stuent_id%3D4%EC%9D%B8%EA%B2%BD%EC%9A%B0/Student4%20%EC%8B%A0%EC%B2%AD%20%EC%B7%A8%EC%86%8C.png)

<br><br>

6. 사용자가 instructor일 경우 /course에 새로운 수업 추가 가능(POST)<br>
instructor를 구분하기 위해서 1.에서 instructor_id로 만든 토큰 필요<br>
토큰을 디코딩해서 해당 내용들을 사용하기 때문에 instructor_id로 만든 토큰이 아니면 오류 발생<br>
![alt text](./RESULT/%EA%B0%95%EC%9D%98%EC%9E%90%EC%9D%BC%20%EA%B2%BD%EC%9A%B0/instructor3%20%EC%88%98%EC%97%85%20%EC%B6%94%EA%B0%80.png)

<br><br>

7. 사용자가 instructor일 경우 /course에 새로운 수업 추가 가능(PATCH)<br>
instructor를 구분하기 위해서 1.에서 instructor_id로 만든 토큰 필요<br>
![alt text](./RESULT/%EA%B0%95%EC%9D%98%EC%9E%90%EC%9D%BC%20%EA%B2%BD%EC%9A%B0/instructor%20%EC%88%98%EC%97%85%20%EC%88%98%EC%A0%95.png)

<br><br>

8. 사용자가 student일 경우 /student에서 token의 student_id의 내용 수정가능
student인지 구분하고, student_id 디코딩을 위해서 1.에서 student_id로 만든 토큰 필요<br>
![alt text](./RESULT/student_%EB%82%B4%EC%9A%A9%EB%B3%80%EA%B2%BD.png)