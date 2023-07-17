```
//student table 생성 or 삭제 후 생성
DROP TABLE IF EXISTS public.student;

CREATE TABLE public.student(
	id serial4 NOT NULL,
	student_name varchar NULL,
	student_email varchar NULL,
	CONSTRAINT student_pk PRIMARY KEY (id)
);


//student table 확인
SELECT column_name, udt_name, is_nullable FROM information_schema.columns WHERE table_name = 'student'


// student table 데이터 삽입
INSERT INTO public.student (student_name, student_email)
	VALUES (
		'이주형',
		'wngud9646@gmail.com');

//student table 데이터 확인
SELECT * FROM public.student


// registration table 생성 or 삭제 후 생성
DROP TABLE IF EXISTS public.registration;

CREATE TABLE public.registration(
	registration_id serial4 NOT NULL,
	student_id integer NOT NULL,
	course_id integer NOT NULL,
	CONSTRAINT registration_pk PRIMARY KEY (registration_id)
);

// registration table 확인
SELECT column_name, udt_name, is_nullable FROM information_schema.columns WHERE table_name = 'registration'

// registration table 데이터 삽입
INSERT INTO public.registration (student_id, course_id)
	VALUES (
		1,
		2);

// registration table 데이터 확인
SELECT * FROM public.registration

// course table 생성  or 삭제 후 생성
DROP TABLE IF EXISTS public.course;

CREATE TABLE public.course(
	id serial4 NOT NULL,
	course_name varchar NULL,
	instructor_id integer NULL,
	course_type varchar NULL,
	CONSTRAINT course_pk PRIMARY KEY (id)
);

// course table 확인
SELECT column_name, udt_name, is_nullable FROM information_schema.columns WHERE table_name = 'course'

// course table 데이터 삽입
INSERT INTO public.course (instructor_id, course_name, course_type)
	VALUES (
		1,
		'테니스',
		'교양');

// course table 데이터 확인
SELECT * FROM public.course

// instructor table 생성 or 삭제 후 생성
DROP TABLE IF EXISTS public.instructor;

CREATE TABLE public.instructor(
	id serial4 NOT NULL,
	instructor_name varchar NULL,
	instructor_email varchar NULL,
	CONSTRAINT instructor_pk PRIMARY KEY (id)
);

// instructor table 확인
SELECT column_name, udt_name, is_nullable FROM information_schema.columns WHERE table_name = 'instructor'

// instructor table 데이터 삽입
INSERT INTO public.instructor (instructor_name, instructor_email)
	VALUES (
		'페더러',
		'king@tennis.com');

// instructor table 데이터 확인
SELECT * FROM public.instructor

// student table 데이터 수정
UPDATE public.student SET "student_name"="김재환", "student_email"="KJH@github.io" WHERE "id"=1
```
