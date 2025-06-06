--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ACHIEVEMENT_TYPE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ACHIEVEMENT_TYPE" AS ENUM (
    'COURSE_COMPLETION',
    'PERFECT_SECTION',
    'EARLY_ADOPTER',
    'STREAK'
);


ALTER TYPE public."ACHIEVEMENT_TYPE" OWNER TO postgres;

--
-- Name: REQUEST_STATUS; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."REQUEST_STATUS" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."REQUEST_STATUS" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: USER_ROLES; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."USER_ROLES" AS ENUM (
    'USER',
    'ADMIN',
    'AUTHOR'
);


ALTER TYPE public."USER_ROLES" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Achievement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Achievement" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    type public."ACHIEVEMENT_TYPE" NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Achievement" OWNER TO postgres;

--
-- Name: AuthorshipRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AuthorshipRequest" (
    id text NOT NULL,
    "userId" text NOT NULL,
    status public."REQUEST_STATUS" DEFAULT 'PENDING'::public."REQUEST_STATUS" NOT NULL,
    message text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."AuthorshipRequest" OWNER TO postgres;

--
-- Name: Block; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Block" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "order" integer NOT NULL,
    "courseId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "theoreticalMaterial" text
);


ALTER TABLE public."Block" OWNER TO postgres;

--
-- Name: Certificate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Certificate" (
    "userId" text NOT NULL,
    "courseId" text NOT NULL,
    "issueDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "pdfPath" text NOT NULL
);


ALTER TABLE public."Certificate" OWNER TO postgres;

--
-- Name: CompletionStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompletionStatus" (
    _id text NOT NULL,
    "userId" text NOT NULL,
    "courseId" text,
    "blockId" text,
    "taskId" text,
    "isCompleted" boolean DEFAULT false NOT NULL,
    "completedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CompletionStatus" OWNER TO postgres;

--
-- Name: Course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Course" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "authorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    category text NOT NULL,
    "coverImage" text,
    level text NOT NULL
);


ALTER TABLE public."Course" OWNER TO postgres;

--
-- Name: Enrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Enrollment" (
    "userId" text NOT NULL,
    "courseId" text NOT NULL,
    "enrolledAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Enrollment" OWNER TO postgres;

--
-- Name: Option; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Option" (
    id text NOT NULL,
    text text NOT NULL,
    "isCorrect" boolean NOT NULL,
    "questionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Option" OWNER TO postgres;

--
-- Name: ProgressTracking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProgressTracking" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "sectionId" text NOT NULL,
    "completionStatus" integer DEFAULT 0 NOT NULL,
    "completedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProgressTracking" OWNER TO postgres;

--
-- Name: Question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Question" (
    id text NOT NULL,
    question text NOT NULL,
    "testId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Question" OWNER TO postgres;

--
-- Name: Section; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Section" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "order" integer NOT NULL,
    "courseId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Section" OWNER TO postgres;

--
-- Name: Task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Task" (
    id text NOT NULL,
    question text NOT NULL,
    "correctAnswer" text NOT NULL,
    "sectionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    options jsonb NOT NULL
);


ALTER TABLE public."Task" OWNER TO postgres;

--
-- Name: Test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Test" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "passingScore" integer NOT NULL,
    "blockId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Test" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: favorite_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorite_courses (
    "userId" text NOT NULL,
    "courseId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.favorite_courses OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "refreshToken" text,
    role public."USER_ROLES" DEFAULT 'USER'::public."USER_ROLES" NOT NULL,
    avatar text,
    fullname text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: Achievement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Achievement" (id, title, description, icon, type, "userId", "createdAt") FROM stdin;
c620c3f5-1dbc-45bb-92fb-d39c74c77532	Завершение курса	Полностью завершил весь курс	/icons/trophy.svg	COURSE_COMPLETION	c8d390d0-8b02-4eda-a13d-00212e3f1d45	2025-06-05 20:16:35.868
\.


--
-- Data for Name: AuthorshipRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AuthorshipRequest" (id, "userId", status, message, "createdAt", "updatedAt") FROM stdin;
afea16eb-f82b-4be4-bf5a-476371ea32e9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	PENDING	\N	2025-06-06 16:16:40.593	2025-06-06 16:16:40.593
\.


--
-- Data for Name: Block; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Block" (id, title, content, "order", "courseId", "createdAt", "updatedAt", "theoreticalMaterial") FROM stdin;
7bc0b7cb-34ed-475e-a816-d7f06ec93f73	312	123	0	28768407-0466-4e11-92c0-960633f98791	2025-05-27 18:50:13.707	2025-05-27 18:50:13.707	\N
a8c1bb73-7f98-4672-bb3d-fd4224651d2c	123	123	0	460f683b-080e-4a52-bc27-3bbba425b365	2025-06-01 13:51:01.794	2025-06-01 13:51:01.794	\N
6ea2381a-1ce7-4361-af0c-22244efcca76	123	213	0	39fec602-18db-43b9-8738-3deef6b9d168	2025-06-05 20:16:30.787	2025-06-05 20:16:30.787	\N
\.


--
-- Data for Name: Certificate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Certificate" ("userId", "courseId", "issueDate", "pdfPath") FROM stdin;
c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	2025-05-27 18:52:30.059	
\.


--
-- Data for Name: CompletionStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompletionStatus" (_id, "userId", "courseId", "blockId", "taskId", "isCompleted", "completedAt") FROM stdin;
d0caf118-d8e5-4185-b6a0-c5d3dce08273	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 18:52:06.062
cb2f47df-7aae-46c2-914f-b2c084d79a71	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 18:52:16.599
bd3146cb-eca8-4622-9170-31443fc02985	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 18:52:20.231
72eb44b6-787c-4a1e-861c-96fc66b47f81	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:51:05.386
37e3bdce-c43e-4b98-928f-a496951a6e84	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.601
3ea67d43-ef09-49ac-8c33-6546a568738f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.603
df021548-b2b3-4c2a-a82e-994d5914512a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.844
da2cd735-412a-4625-9a3a-03ee4d2617ba	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.873
5fa3ac8f-9970-463b-b602-cad651b87f31	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.938
169b825f-332b-42c4-b267-06483d34cb76	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.98
4c4fdadd-786c-4633-85e5-c63ae598a0fb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.018
2ae088d5-a7d4-4aa8-9580-32fd11f8a916	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.117
6979ea87-3f76-449e-a7bd-4d711ed11825	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.449
b92344cc-d3f1-4cfa-af54-987da86ba350	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.565
db55c650-5fae-4f70-a0f6-32e7de5e8774	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.641
5c4642c1-e8e3-4f59-82a2-c3675f3cdf5b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.502
c1d7f34e-1b5a-413a-a545-fb2c72fd8e95	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.574
4cdab481-deb1-4567-b9db-e614b79ab51a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.639
12013186-a6a4-494d-8e9a-90412e2d68f9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.704
dc28a14a-4127-423c-bccd-190cbb417f5a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.75
b5cc57c1-ed3c-45d0-a16f-b64836f90375	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.791
951f14bb-3836-466c-992c-85aa373e8a6b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.852
c9ab093c-d19a-4095-b9a6-94dc9ab0f742	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 19:02:18.726
c3fffbea-3135-4578-927d-f8681434c195	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 19:16:08.185
a2139d56-9f35-43fa-a313-df57ff626413	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 19:16:30.797
31e9d6a0-1ff5-44a8-aeaa-6f6bede2745a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 19:16:33.812
40f1bdd1-3209-47b1-9859-4a9e37e291ad	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-05-27 19:16:36.798
6349fa61-f18d-4f02-b52c-20e6b6911f23	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 10:50:46.685
92661966-aa93-4c3a-a2b0-1f1431f7d6b8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.905
04fb80c1-e509-4667-a342-dcd2a4421712	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.966
94d20941-5af8-485f-aa0d-a0e453d242b9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	7bc0b7cb-34ed-475e-a816-d7f06ec93f73	\N	t	2025-05-27 18:52:18.281
0d259927-64ef-4d3f-bd3e-997fa79b1d31	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	t	2025-05-27 18:52:06.035
0760bc2d-9424-433b-9d5e-70136ac46bfc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 10:53:34.952
da794461-8733-443d-ba34-53c62c4c1ac3	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 10:57:37.056
b96e97bf-322d-49e1-b2f6-26a82c1de6b6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 10:57:43.932
74efe4fc-2c19-447f-b25e-0308319b7471	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 10:57:48.944
19ca9853-c0f8-4211-ae0c-6dfa59f3a5c3	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 10:59:00.358
52cce6a2-d403-4847-93dc-3a80c3e33bd9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 10:59:02.961
d63ac184-8fe7-47a1-a464-de514c2bf10b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 13:41:32.649
6b7c8882-a9e5-48c0-80fd-a78d3332dcdb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:13.029
c799c23f-a97c-42bf-8832-5ae553192674	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:13.159
02f4cf5e-73dc-4468-9e33-d0453622c507	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	t	2025-06-01 13:51:05.352
e0541ce5-f081-4b15-9579-e7604c83baa1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 14:18:39.476
b56ed9e0-49e3-4713-844c-39cd202cfce5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:50:16.712
b9e61b47-ee67-4a65-b774-c1a7a36cbdf8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:50:55.973
818ab895-95bd-4cb4-8018-abdb3b3ad752	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:50:56.02
588daf99-8096-4b33-b4ad-72ed764871fc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:50:56.057
712f842b-af5a-4cd3-8c4a-232ce98242b4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:50:52.385
383a6e69-1541-4d3c-b883-79ba3253076d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-05 20:34:31.278
b0c4e42d-cda0-4887-bb6c-d217cbabed30	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:52:05.291
2b0ad955-648c-44df-a194-b622223882c2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:52:28.186
d8fce79c-6e00-442f-9056-5650a6a32458	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:52:46.502
c58e110d-4760-41a5-adbd-ccd1b821200e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.583
1b6acf69-71e2-4296-a7e2-c030e0a181d1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.814
377f4e48-d8f5-40e6-a69c-09fe6bba9a85	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.843
28dc7520-bb16-4574-8f9e-3a4f326d162a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.172
d9448984-2e7f-47a0-9aef-c09430435b8e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.173
768861c3-ad59-42ec-9e00-37085c283bfd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.214
4af89d3a-c290-4210-87c5-f57ec4bc17eb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.515
e19cf072-1fc1-4b16-be36-8440c04a6095	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.565
904bb647-1ec5-483a-9e5a-5eeaf85f38ac	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	a8c1bb73-7f98-4672-bb3d-fd4224651d2c	\N	t	2025-06-01 13:53:10.335
6fd2408c-45b9-4461-bcc4-1d24fdfa85c1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 14:20:29.244
e4960728-67cc-43a0-b6f6-b864cfbe74b9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 14:20:47.263
3bffe22f-7a73-4b4c-af80-73778d35daa2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 14:20:47.622
6efc5f7f-447e-4136-b8a8-ebabb24870f1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.488
85bf29e6-069e-4c42-9b12-95018b6a7076	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.528
ea37caf5-84f0-4ca9-b318-79a53c4f4e5e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.322
fd251a03-841b-411b-8367-83d7bac15bab	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.348
3ca5f91d-e258-4500-9f74-dc2455dc9541	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.407
7a4b385d-c725-433e-9fc5-2f2076ea4860	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.48
6f704af4-8808-4fc5-bb12-04f43d8a05fd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.511
e41f5d37-c483-4673-8994-bf6931d97e0b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.545
279ae051-3232-4ba2-bb40-33e67bd5ef9b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.595
a56ba6a3-0e8d-4816-8bca-b068c0f0008e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.627
2b59f273-9223-47f3-84ee-93890568c9da	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.705
86feb053-325a-461f-94b3-5cfb2da7e4d6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.946
b2ab9a4c-772d-41af-84fd-ed2c0f7f048c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.028
41272712-dfc2-4462-9312-dd296dfb5202	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.077
48a9a7b6-9c1f-4465-9a70-916eb3f0c800	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.549
135f4d04-b4ec-4730-a76d-4aacd24693c9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.609
9a32f90d-0afd-41ab-b08a-8915c3cbbed2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.669
356ff616-6bc9-4043-a363-f6881ab9e857	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.781
115238ef-30dd-45d6-9efe-2efab72cf0d1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:52:42.551
7f239854-5434-4419-acde-bbf9c9e6fc5e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:52:42.569
ceeec511-34fb-4b3d-b8d9-6f5ad6d61760	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:52:25.566
663dedf1-9d74-4d4f-b773-f2f55a151c92	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.606
2f66d34d-a14d-4362-abc3-edacfd5d2bd8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.638
5af0b1d0-364d-4587-9225-eb115ccf6a6d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.702
7cd4f58e-170c-4615-bf48-30588a8f11e7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.735
82068c71-4a83-48e8-997b-8893a719c20e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:10.772
424259f3-0259-4aaf-a55b-728474c7071e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.072
23efbe38-e168-44a0-90d9-4b39a7967192	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.271
a0455eaf-c018-4ad7-b1f2-cc840173d8b2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.345
303a480e-70a2-4f56-95f6-f384d306c237	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.39
5ecde9f5-2d49-4891-8613-e852528a234f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.449
04f53ecb-0366-4b1e-9f84-ad6e5ce2fd3f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.601
43db249f-cabd-408f-8f08-0b61f3bd3905	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.602
c157764d-d7f7-42c9-a9b3-112a7b8bd0ac	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.641
fded8b7f-c131-4feb-8bc2-1d0d719e9cad	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.528
204549c0-5c6c-4de4-aeb2-9ba7df459335	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.571
7480bc8e-4f3b-4f31-a439-90f7668d7a9b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.614
c3edb366-e9b5-48aa-b80c-b624c9806819	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.694
efafd3b5-7839-44b1-81ea-f05004534bc7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.153
e976138a-39a7-4613-a5d1-8045fe71ad9e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.349
022b1f3f-2873-4bfa-9ae1-73344c56f2c4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.406
e52f2bd6-5347-4b71-9fcf-689c15c69599	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.449
6c10afe1-d592-473d-acba-ebcfb0f9c961	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.503
76bb6c91-9d61-4ff9-a2e6-c47470b88806	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.609
9a791f1b-77fe-415e-97ac-2edd61178f5f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.887
58aafaa2-6934-49bb-939f-f2ae02b66c0f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:32.023
fe799141-8858-4c23-92d3-e4a27c96fdc6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:32.149
1da2544b-7315-4ce4-baa2-37c962988c9a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:11.672
fa215ac4-7e5b-4797-8790-4454793347d9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.852
dea9d341-03b8-4b46-9012-86414f027156	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:13.101
cc2d559b-58e9-4845-90c8-5b45d3a4a23a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.214
ff647a8f-f285-4a1d-8ee1-5b616bf4d4f5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.275
2b7f139e-8b41-4ad7-b574-ef0736d02bed	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.34
6b02de4c-38ac-46b7-9b6a-261070498446	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.461
d08adb63-a794-4cc5-841f-cd3737c58f4c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.552
cb7e8bdb-a38a-4adb-9299-4a0103b0adbb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.618
73f3d22e-fd85-472b-bdf3-d7a39ea0cc16	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.704
6181bdca-23d8-4462-9389-bb3cec022093	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.885
6cd0a3a7-9538-49cf-9495-4bf0012a5fee	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:20.028
f3157e61-d260-4feb-bad9-4c642da3cb02	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:20.079
0c5b424e-f5ee-4424-857d-587ed7b6084d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.512
4ac4c0af-e066-4c8b-8c35-1ac36acafb5a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.566
0d254d17-4788-420d-a95e-6abd74457e22	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.713
6eaebbff-50f6-4947-85bb-f00f7b06b3c5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.795
c2c030d0-fa54-489f-9819-188cab0c1075	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.861
779f9cd5-0b62-4834-ae12-af00e32a018c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 14:20:39.168
cc9cc1bc-07ff-406b-8c81-d718466be7a0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-01 14:20:46.141
b0dfbfae-4f81-4833-92ac-8894c848e71b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:52:42.491
2e8ca9ba-d8d2-4d2f-b5bb-413b61af524d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:52:40.707
c0cd5ced-c629-4e09-8c6b-217ba7000b0a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.357
5d907e9f-52d1-4106-b659-c01d323d03cc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.365
584eb241-07d8-49b5-beb8-e86b537be042	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.405
9ace6da3-bb96-4721-a4a9-0fdc9ae1974b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:12.469
d758880e-b7ba-43ec-b8af-622a35a1932a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:53:13.101
3ed57cc1-18eb-4abb-96c5-199e4eb955dd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-02 07:26:26.253
895b51fd-d71b-4ff8-9858-d2c6aa35715d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:55:17.697
d8c3f4e2-8e85-40ca-8eb6-60872021a347	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:55:17.742
fb9f7204-d60c-4a3a-8c0f-4cf585ca1eba	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:55:10.672
e4548ee1-b2d6-451d-b4b3-e3fe0e8c14d9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:55:14.55
a5792704-3525-4632-b9e8-e391c2cd8a3d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.516
f8b3fb6f-159e-456c-abc9-388a808442a7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.592
c083aaa7-9831-4844-ae0c-370963604633	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.612
2e3d2b95-c8e1-4e9d-8b2d-a64f69f81be2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.649
8135202a-936f-496d-b3c7-96db73d60f42	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.711
4a84fd33-4fed-4214-a4d6-bd7437fede64	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.735
2a984ee3-f95f-4c92-91a0-51369fe552f2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.809
779f072d-ef54-4e2f-b6b9-45942e16acf8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.836
5a55cd1e-33e8-4eed-bc01-3933027b63d1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.667
2c75f019-8a2f-4bc0-b9f3-96144e02db91	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.76
04e1beb3-f2c1-42f8-9a8b-58405f7c9959	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.841
3c861ddc-95bb-423f-b31f-bd876bbc5968	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.934
02850f3a-152a-45d6-8184-f8d2cbbfb2f2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.109
69a92e25-c5aa-4eab-91ad-b1a366551aaa	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.285
5cc729ec-6ab0-419e-a171-bf96a79f9f3c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.553
4e7862ac-3bd8-442b-bf49-4c44f4dc7c8f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.711
bcae2e9c-43a1-459a-9866-e25dde5cfe95	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.888
74c50ac2-6eea-42e2-8923-2e71f8cca454	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:18.93
34c2bde7-e403-436f-af27-f85690caa0d9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.036
4278868e-e07f-40c5-b553-4906ecc068ea	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.055
c0ff4102-d652-47f2-b054-ec4965d6b6ff	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.183
74111e5e-aa8a-488a-a7b0-97ed3bf965a8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:20.079
8630230e-049d-4b8b-a0e4-eb070afb3cdb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	28768407-0466-4e11-92c0-960633f98791	\N	\N	f	2025-06-05 19:31:42.609
494b9147-e523-4092-8a94-74b24cf73109	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:55:17.764
560900a2-d110-43ca-a042-d4bb521e540f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.104
d86f2592-a51a-48a5-99b9-cf6b4080dde2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.132
457178f1-9cce-46fa-a8d3-bb780b9eb8c7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.213
b11a4c1a-282a-4630-b51a-b02a1bbd2db6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.398
6e2b0ad8-b9dc-4fce-bec7-575c1687bf8d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.552
ec3fe82c-37ca-4acb-80f5-6fca9c9e1f2f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.619
8785faab-c5c6-4c37-9d27-9250323f88bd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.776
60ecf4c3-2c73-4a58-9fbc-b4ddead32c39	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.885
0177fa71-5be5-42cf-8ce2-f9e075e7b948	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.956
d4d16f58-0ba3-41b4-848b-2fb79c62a38f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:20.028
5f6e883b-2338-45c1-a21d-e2a7ee21001d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.185
7426cca9-aff0-4f41-a14e-37eb20272fab	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.268
95e97cb2-a811-4bde-9644-382c0f616c84	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.295
fb94d915-0e6d-41fb-8e82-3cc02c4f1855	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.341
d85c3392-28ec-4b8b-83d2-cb783221fcbf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.458
cdb9c0d2-aac7-49b1-b86c-7c202f8be94d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.667
bf95b00f-4ba4-494c-8642-8addaec99c5f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.672
fbca022e-3888-4196-9f84-a999280ad78a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.841
cd05a72a-493f-4506-96f3-641a5b5511cc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.934
3b4eaabb-243f-4253-9963-5f4db1eb549d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.017
27b621c6-2fc6-42e5-9019-0e78a5839a5c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.201
51f6f3b3-3001-49f5-8832-084fc694bab3	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.201
f5bb826f-5c64-4d4d-ad00-61289afc14c8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.285
0af92c0b-3b6f-42f1-9058-136cab472112	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.38
68c70cf3-ee44-41df-85e9-c3439ff295f9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.38
277e7405-a745-4cc3-9620-0c6625e8f57e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.553
b1a8b39d-d58b-4b7a-998c-de15563f1256	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.558
4986719e-0645-48b6-a02d-a9d0deec3f8e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.632
17ccc16c-7558-4eba-a724-a97dcdea3231	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.635
be74d88f-dc1c-4498-b4c7-006ee1431498	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.711
1430f2dd-3898-4570-a45b-3b5faa158c7e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.591
d66fdd4b-76bb-47db-aafc-8e15dbdd2dbe	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.666
eb8387b9-897f-489c-91c5-5c10eddda979	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:23.713
89464639-d70b-4791-ad55-bb663fa807fd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:33:20.535
8be34f5e-7cae-420c-94c8-9acb85e35b32	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:33:34.225
a8bc7692-3680-4e20-a0e5-a289d538f93f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:32:52.974
2b86f035-bacb-4296-801f-734770acc19a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:33:17.725
36a762de-d624-444c-b6b9-18c9008bb88a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.711
5c974e04-5f3b-4ed8-98d1-91686699ecac	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:55:19.885
44a2b5a2-2437-4465-81dd-c21342bcc554	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:38:43.445
07841d78-a783-4d75-bba8-b72693a6b65d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:38:30.16
ecc8f7c4-f87e-42c2-9bfa-f42e180a5820	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:38:41.935
714c9def-f851-4120-a727-b2eeac5c612c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:21.276
e43cf655-aebf-454d-9eb7-6ee56b551aaa	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.712
6adfafbd-0df1-4c53-a2b0-fcd3444f5a45	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.742
ccfe1744-576d-4b13-a14f-00e47efa065a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.89
e823b353-2153-4778-a015-cc072d9305b5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.968
5e0b68a9-d1f9-4258-b7bc-780374f7c2f6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:12.158
1ccc47d9-65d2-4418-ad19-0005824d46b8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.833
e0076972-2786-4d58-ae1a-684c2ce0b15d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.908
f4bcce42-95f3-4160-9130-3d51ef45d533	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.152
4678d7ad-787e-4b85-9ff2-b2cec9576322	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.203
fe935804-05f9-4463-ad7a-f3d82cdf1dae	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.393
e5e6c650-215a-479b-8915-ecaebcb0b9f4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.654
57c3ff23-9583-4b1e-845a-4d6c47d66921	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.6
5e681c01-1674-472d-a496-bcb3dd8b912f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.664
3329034e-9f45-4456-927e-d4c6a930c0be	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.804
b9fa76ff-c992-4a3d-bdcc-f30807d1cc90	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.89
93b968d3-d5cc-4eb5-9fb4-820b27b4d4fb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.968
1d2e89cc-3b5a-4529-94d5-0bab61be7f34	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:12.158
e24444ef-712a-4fe4-8354-a240a50fb40e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:54.908
6fec0e26-41bc-4ea9-bad0-e4e2dc41baa6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.341
64694e7b-a044-4c99-8bbd-91549a915691	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.578
4d6499dd-c0b6-441b-99b0-ad13a0fde7b7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.776
2c600a45-1bcf-4366-87f6-a35f6e75e61e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.847
fa93ef62-3f4a-4911-92e8-23c634479446	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.909
26aeff25-0b21-4068-85d0-ede7f899332f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.985
cc95c18c-df60-4ab6-a682-96bc858f425f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.045
dd2524f7-2488-4176-9081-0f5ac54707ab	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.297
a9b0046c-3823-472a-90ef-865d50465be7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.379
280a257a-aab9-427a-9013-996163b8d86e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.442
046763c8-bd97-493a-9106-9cb4992baf1a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.55
25c05784-b58d-4ef5-88d2-a2228490d422	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.672
ef6af619-d9ee-4159-9e76-cffff4057116	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.699
0c866e58-0c37-4bdc-9876-ad5d67fc2b5e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.967
e74a6fa7-2005-4102-8f42-78a64347938a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.026
32068308-fce9-4b68-9d8b-553b381b958c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.087
76b528bb-8795-42d2-91af-8b7544dd7257	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.186
02099a91-0856-458d-aa50-14a644db8fef	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.264
0ed0fe36-cc72-4225-83c9-cba1748814fc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.337
f8def764-fef7-4727-9616-eca2dfb8e94f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.556
303775c9-e961-4b92-a9d8-7959deacf17c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.645
fe4ee637-1312-414c-85c5-f3f211035108	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.727
9d3a70f9-527e-498e-8522-956fbb340a06	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.817
83313146-3254-44bc-8335-a1d56e7c2a53	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.901
5dd1acba-73c7-49b3-b1cd-45d559efbfdb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.096
55c9b61f-be9b-4e97-a360-2456534a99e8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.203
a1eedaec-5b52-4a03-80ba-1d9f5d050928	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.286
8d79be47-2eb4-445d-988f-5abdfb0f3eac	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.477
d5912a12-7ead-4b30-a723-a0867924defd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.574
bc463edb-1faa-472d-bbac-9284353dc52f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.654
42b9bb39-8c23-44ef-8754-99b89ca578b8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:39:43.971
09654a6c-035a-4be2-b722-deda516b1fd6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.109
312dae37-6636-4905-aa33-2510c939d48b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.152
1653ba80-60fa-452f-81ec-437f7db1e56a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.628
41b843c3-b212-4144-acc0-00cb52c957f1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.669
d358fa2f-a10f-4a53-a865-65b0f2c080c0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.731
7876043c-a34c-4db5-b316-ace82f597d8c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.985
a59fbd40-c818-439d-8d84-5db708500926	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.469
99c29cbe-e54c-4e87-81f2-6fe1d4f84643	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.504
cd6a968e-15e7-41f2-8519-e57c841e6834	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.262
96bb22ab-1cb4-480a-827c-e75f16cb8ad5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.343
f2df4636-75c0-4fd9-aae5-afc17014e9b4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.427
fa386ef7-520e-47c0-8094-9897207a7594	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.488
bdd07623-08fe-48b1-8b05-158003cadd87	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.557
c7628d02-6e5a-4cf5-9026-fb983b50c7c1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.645
768710e5-c872-479d-a684-6b69e4cb4cf7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.726
72e6fe33-d6d4-49c6-a790-f21c0cd7fd6f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.817
e1762960-567e-4070-ae93-1698d01149b8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.901
67701a40-278b-4a8c-9483-0f93a3162bac	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.017
e60d7c9e-7aac-439e-b993-e4a3cd277a1f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.287
61037b95-f0eb-483a-93ee-69195809ec63	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.393
510714b3-8a0d-4de9-aa2c-8dcd8370584e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.477
23b0db20-d4fc-493f-82b2-3eefe081c5f6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.574
2a6dc2a8-86ea-45e8-8af5-9eb1b314bf6d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.968
80caab3e-5fac-42c7-bd11-b4adb2332414	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:12.078
cc10ff37-34cc-4fc4-8e6e-0c4fe438ab34	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:12.158
63476918-cc50-4ba2-b3d9-09691d2de13d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.158
527b6b6b-2be3-427f-a406-515505336daa	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.188
6d0b3eb5-c7b9-405d-8d44-6b69ef8f7c14	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.299
0b23290d-0a7b-4fca-bcfb-6dc9caebd239	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.441
77362e0a-bee7-4e54-b24a-09157d70c0bd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.489
cf2cb9e0-4d9b-41ab-946f-f8aeca3e3a11	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.534
d8eb5a62-af44-4d88-b834-f131bb02229f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.572
74786fa7-51b2-4472-b571-f77d373f3c1c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.634
6fd93d7c-2d26-460d-b9a2-9434cbf9a07b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.674
8a2d2268-3933-4fe0-9e7c-467bf06a1d4c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.742
9b78d513-7446-4bde-bdb9-75a450f494b6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.971
c4f7d701-462c-414d-9dc5-9e25979076fc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.009
46e0ec58-c0a9-46b9-95ac-e97a8d64c620	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.128
0e0ec364-4869-4a34-b6a2-dadeb9940e8a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.144
66ad7f7c-a1aa-47dd-a5d1-2f5b0fa25060	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.187
a43c13e3-76e3-4f94-a5e4-e2f86a55e426	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.286
0fc17baf-8588-4ce7-94e8-e9d5a89a9ac0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.384
3cf1a9d4-cbce-4913-a062-5573ee80d1c4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.443
81ae458c-4cb5-4bcb-99d2-b108b24eee5c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.487
b899a67c-f673-49a2-b0f9-c8e61e0eefa4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.526
fcaccb72-2a72-4804-a567-59a0bc8c9620	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.706
c9ad6c92-6320-46ca-b56c-ccd0b5c62cbf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:39:44.002
4d173d69-52c4-49f4-9aa7-e6c7b75e8a7a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:41:08.638
61419caf-5275-453e-a204-da1327b0381a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.152
4475f98d-5437-4469-b7b9-a24db0997a39	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.137
75b00350-66c5-4127-9dce-914126b4afbe	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.204
60aef02b-b8df-4c26-92af-b2e9f8e4e260	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.297
d32b4c6f-89f1-4d34-9808-b238a30baab0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.469
598bd72b-14a6-4431-a0cc-099d1cabd24e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.017
57687224-8887-4283-baa3-74a3228dc0df	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.019
bbb0b699-fb1d-4e2b-981f-a24050b48447	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.096
f8752255-070c-455f-9f44-46764de3d888	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.286
4906017f-0695-4ccd-b349-fd4d00338152	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:37.476
3bc95265-36c9-467b-94d4-af63621d37be	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:39:47.586
e7980d3e-d61a-43bd-9716-eb061027bbcc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 20:05:15.499
979517e6-a117-4036-b7d1-f244ffecdd09	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 20:06:48.441
16abbf31-93d6-485e-9f30-8fbcd7849584	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 20:06:47.505
6557b312-10e9-43ee-830c-b1f16be70149	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.158
4bfbd7d6-b3ec-4c76-af32-51ece2698a0e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.166
86646e5a-cff1-4a66-9a3e-ebafa3244dca	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.187
b4796b24-2827-4740-9167-2796c96ed6dc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.264
8e3122af-8ef3-46ce-a9c8-0c3feeba2901	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.302
aa5544cf-a64c-40f8-950d-9c45983b61d7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.361
aca9a0aa-229e-4356-b453-bf31b8278d49	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.127
3d45fc81-e87e-44e9-90fc-4f1132813fb9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.166
40bb8679-47b1-41ba-a570-05a94e5e0a0d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.245
b79119f9-26af-4ab6-8952-846c16e9c886	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.284
d5324e4e-3b81-46ee-a406-79562b2afc49	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.322
8b79f2f1-8bb1-4964-8dd6-bfaf1d78b885	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.521
5b4d0d3a-6c55-4ad0-ac21-931ac7dcfef9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.414
747deffb-b3e2-438a-a20f-811b71e665ee	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.494
9b05285b-0257-4b8b-a23e-890f907d18c7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.578
16919cd5-5014-4d26-9bf7-1e277bf240d7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.731
f3f4f6ef-07df-4721-8ce2-3cb6ce9e3141	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:55.985
47f52db7-798c-4c18-bf74-9c54a78ccb89	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.137
13a43f93-0c5e-42b0-a641-d69b2aee69fa	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.203
6d942710-910c-4024-b5ce-50e80d08412d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.379
f42e9744-3e7c-49fc-b4ff-e65db5441687	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:56:56.469
c4b0acce-975d-4b3c-b5b7-553f260fdbf6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.708
cc609cb9-8067-420f-9cf1-dad70f7d3e0c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.727
cf21d4e8-f42a-4496-ad86-92f13635590f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.763
d508acf8-8f82-44d9-83ee-b4ec28c23334	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.817
b197b7c7-4c29-4c46-b53d-0bc907e494a9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:35.921
962d3a53-40ae-4580-acc2-d63977f9c7fb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.261
221329b7-8bfb-4ded-a68c-3179f8363c1d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.338
88b41662-0ec8-43bd-9df0-b117934930a4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.427
14536b01-b2ef-4485-b459-13e529f6aee5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:57:36.556
c22de8bb-350d-4535-83b4-70b49f031915	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:46:01.814
24f99895-ea9a-4d55-b558-88be58475292	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 20:05:15.471
09eddb6f-362e-4606-9c35-8f26baa7b725	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 20:06:24.748
00948d2d-797f-4828-9e95-133d3ee6c0c9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 20:05:14.15
1e4371fa-a7ab-4265-8ae2-8f29f89ec981	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 20:06:58.876
f780e5e4-20c7-4a93-a0fb-0683f0237542	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:59:07.308
7621d0a3-4558-45ef-a344-7879b0921a5b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:59:08.856
45c339c5-69cb-4be8-900f-2b77bfd12119	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:59:17.048
9a8523a9-c6e3-42b9-97f1-a3a1e320c33a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.248
ebafbef4-9794-40b0-aabd-7f7b785a59e2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.293
08ad34f4-85e0-4f2b-94cd-8253b06fcd58	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.323
95e141a9-6413-4f5a-baa7-701edef20da0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.365
8c52de10-0fcf-4bd6-81dc-a8f81f90259d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.414
4c2eddef-77f6-4a75-a807-c652c345ede8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.437
1890429d-caff-4d56-bb53-7e534c4c7e9b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.495
c77049bc-f539-4c38-8b52-12ce17756cb5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.555
f103d452-4600-468a-b10c-57d45d209dde	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.579
f175f15a-7dfb-4144-9dfe-209b28116f16	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.615
7e620058-c3fa-4134-987c-9e8d07aabb95	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.671
74b2c49d-a056-417a-bb46-065c13bc4274	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.698
dd3eaf5c-58de-4a02-8354-53696f51f459	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.779
00b190a2-d7e5-47bc-8c2f-bb8d2d3f4121	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.78
5815589f-8b54-43ba-9338-77f5acdb4f3a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.83
9e855cba-b9fc-4330-9ebd-4d4ae000aed1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.86
5dbbbde9-353f-4656-96d7-043595f0e940	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.911
bb2e4d5e-a170-4458-bedf-27cbcfb5d7cb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.991
146fe1b4-f249-43c5-98c1-18c4d77cc63c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.019
3e24c66c-1305-478b-b38e-59696ffa0d01	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.071
b2f1e2db-a0bd-4981-840e-7bdcb81123fd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.098
7b38cd1d-b5c7-41b5-8856-a075a31e84e4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.152
770a0e55-350d-400f-be26-2fa74e8e2601	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:41:59.25
35e7ce82-3232-425c-870d-1d5174195bdf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:41:59.276
db174e15-c4ea-49dc-872a-84e7acdb5acc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.096
1b5c865e-c4e4-4dbc-b123-fb352ea1cb1e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.112
1cc7eaf9-5846-41f0-abba-170cdb90f5c6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.139
790cd7d5-e706-4d90-9e15-dc4205d92ad7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:03.21
c6a545db-03eb-4ec0-8c06-6cd8b1c696de	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.192
3215a6b7-706d-4e34-8768-38bdbcd0dd25	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.228
77a9c952-aaeb-488c-9369-5c224bcc7dfe	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.269
5121237a-d030-4298-b395-7d6f2a0c13e2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.31
b26992f3-9483-42a6-85d0-7dac6c38a77f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.351
69af5423-00f6-4c23-bbe7-86da8cf8401b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.356
bffbcf66-23ef-4a5a-b7f0-c116fab4a4f0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.396
9ca36c74-f0fd-459a-be5f-39b54c2aa63e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.657
fb021fb7-d04c-4be1-989b-d3bed94752c8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.735
cbac796d-fc63-491c-9a38-8b6ac0a2055d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.773
b3490e94-62b4-487c-a02d-481a27900713	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:04.813
d086fa2d-3fc4-42dd-b4e9-83539cb6d4fa	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.086
fa71b452-5044-4dba-8e34-6ed3dc191329	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.155
856a75f5-43fe-455d-b173-86a5287f1dff	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.226
7035acdf-c7e7-43ef-a682-ef60ec2f9fbb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.235
317951bf-1a19-4bb6-bdfc-3839b08dbb9b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.261
fc7cf3fe-0ce7-47fb-aef6-2a8eaea8ee98	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.727
51bdbb16-0938-49f6-8db9-2976734fdd9f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.764
179a1788-17ae-49d2-a6e1-28a9566c3897	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.789
b06a8b73-da59-49f4-afd4-08e111296f1a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.827
67f58eb6-f1cb-4a82-a53b-74d475e25653	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.911
c4cf08ae-630f-41b6-add1-1985660f003e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:30.988
83c0ee70-c994-4b6b-a59d-2e7323913077	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.111
7c5659df-86ca-465f-91e2-d644ab3d5e6a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.111
a623997d-625c-4137-b2f8-372de2fa0e33	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.207
c1c5cb04-cfe1-4a4c-b7c0-f21f34597e83	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.253
2fdab60b-32a3-46a1-81ac-12018836568e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.306
e510b09d-f434-4b09-a799-70f6429bd3cc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.405
5deada58-fc25-4eac-9e90-ce7e01f72a88	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.783
2ed771fa-82dd-48a9-adf3-134d021a9206	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.785
36d29b81-9631-4f43-b71b-bbae1488f6cb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.84
af4cd0fe-ff0a-4c00-bfe8-ee999f25d64f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.888
646ccc04-d6bd-4f43-9cb5-9a217c904ff8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:46:12.351
96869c42-12fd-4e47-97e8-2250812b293f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 20:05:15.417
29062904-bd56-4d11-9cb7-e1279900c10e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 13:59:40.671
2a59fddd-0088-4b99-9d17-ffb1993eb81d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:46:12.402
a53e8c82-866b-496b-b1fb-bae15580dbf2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:46:10.221
7b370b8e-fbea-4265-9c24-4a6126993c9e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.556
11e9402d-d7b8-449e-a619-eb9312ddd410	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.652
6bdb3055-925c-4e2d-8597-dbc4ab778667	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.677
feea5ddb-58c5-446c-b3ca-b590eccc5be1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.711
60280ef9-c7ac-433e-862f-d6b9a3062f1f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	39fec602-18db-43b9-8738-3deef6b9d168	6ea2381a-1ce7-4361-af0c-22244efcca76	\N	t	2025-06-05 20:16:35.867
11e7dc2a-6e8e-4fa7-9e95-f89be255bdd5	c8d390d0-8b02-4eda-a13d-00212e3f1d45	39fec602-18db-43b9-8738-3deef6b9d168	\N	\N	t	2025-06-05 20:16:36.847
bb03d2a0-49fe-40f7-b47b-e76be2e9a7a6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	39fec602-18db-43b9-8738-3deef6b9d168	\N	\N	f	2025-06-05 20:16:36.906
5b11313d-7479-452b-abae-3e6525fc257e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:31.94
a0eb6085-aca8-4809-b13f-13301dfa3310	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:32.023
c427a383-e5ab-4943-b1b2-f949e72c7109	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:32.066
c33e1be5-7157-4323-a42d-bbf33a690428	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:32.104
4d70c637-971a-4d4e-a039-00e59b6f6f80	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:32.149
18223077-b0f6-4b44-b3f3-bda912a49294	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.484
50cd5c5c-8129-418a-b773-823d9f67af65	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.544
21db5293-5273-4b75-9112-9db9d7ad78aa	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.566
a7a48436-d3b9-44cf-bbe7-22e23edee9a6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.626
b8c84f21-3954-4ce7-a6e7-59ad8577953e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.686
7f7cbcbc-c6ff-4036-9766-c0742169d8f4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.752
a4431985-5a51-46fa-bd42-3150f7834801	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.8
ab17200a-4b68-46a3-857c-93641c2b75dc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.832
1fedaf4f-0d13-4209-82d0-061a19037e46	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.886
ece81d50-686e-4737-8f64-cc8050efb87d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:46.935
950cdad6-7aae-4742-b3ff-e81314c3df0b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.004
b34746b2-174b-44c9-ae1b-c3c6565fd198	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.004
a6fb228a-a060-4c1d-aeaa-d29e34151380	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.064
8bc6b3d5-e16c-4c7e-a588-052ee6e7dddf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.123
a4ef0493-082e-4cf8-a636-3d4619e2984b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.201
90466e5b-bf98-4b92-a5ee-1cdbe545961a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.202
32e08875-ccf3-491c-b680-840bf0cee13d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.275
feafb311-7040-4f6a-b118-58e6cdc744f4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.276
ef988c85-22c1-4e94-adc5-7caca687bbc9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.349
94a1772f-33e8-48b7-9fd6-7a3bfd1e089b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.35
876519d5-98d5-4d6e-8105-c07483aca8f6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.428
d05d9333-8811-49fc-81bb-54d600f62580	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.428
44b7667b-10ed-4a7e-b9c0-23b857b3f16c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.504
b4a71a77-08af-4230-aff6-6cc2f8711c04	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.504
4a706104-82de-48b7-b376-713b6491d5a4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.586
eab064d4-ad4c-4257-8850-09a50c6132ee	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:47.841
d08445d4-4b8d-4694-9a4a-4c6f1081cc4c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.017
7549d964-52bb-466a-85bd-88c463561464	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.108
0cb9501b-174c-4269-a1c4-17378300c141	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.201
bac4e75a-586d-4094-8bc3-e26093554f21	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.38
b4d0b60b-6ca1-4ea6-9d95-f1c1f12ff3cb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.553
2975e607-4ac5-4b1c-bec6-8f7ea4a585b2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.711
c3b95880-4d83-41d3-b32f-5a4bb9380a5f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.792
4c8a1e5f-ef7a-4c7c-ae48-a42e19fa093d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:42:48.792
8221c4a6-18c4-4b82-9ed9-fcb9f205f48c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.14
d7d75df0-3912-4704-9a09-c57b6427d5a0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.213
d49dc4e8-f682-4218-bb70-8c6babb8b7ca	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.292
7fab0fa1-aaa8-47c1-b3ba-356261c996aa	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.31
27346d15-fe26-4453-a916-df91b2f4e097	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.313
8fcf90b2-6503-44b6-b632-b807413d7109	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.355
c4593a68-846e-4d40-91dd-36b2405a8d22	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.432
5257af2c-9fcb-4244-824e-cf32fec97db3	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.454
cf793c02-82a2-42d1-bdef-f7fe8d994e7b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.511
ebd7b0b2-3e86-4e1e-bac9-7a78a10431f3	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.538
6dafd8ad-1854-4533-ad79-83eb3f343d61	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.61
41bda1a6-9bd8-4ef0-b6a3-b215d05e1929	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.671
37b00b30-ab5b-4b64-8c2e-a0bae1a9ceaf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.695
180b18b9-2c15-4fb6-b2de-93744364bbde	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.697
7bf6f277-f21a-4b78-8665-10d6d62d07b7	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.766
beea34d8-dbc7-4dd9-ab20-fd1b4dff25a1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.79
5e4b4425-5579-4493-b870-ef63e47a6837	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.832
b2191da4-6eda-4ce3-9809-9828d6f262ff	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:09.859
050e7691-f544-4095-81c2-491a9518378c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.61
67b47dd0-68ac-466b-9557-c7c46bce01cf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.616
013876ce-28f6-4b18-beff-9534ad81f19b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.658
37c40917-36e7-4e6c-ac59-54b3e2c9e3bb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.697
22d5886b-d4a4-4725-b8d9-5376d4a7e960	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.808
011112e4-1106-44db-87e7-a16fc2755c95	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.842
88e5de64-b51c-42f5-a860-5968d6e3cbc4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.868
b9f9ff3a-6bf7-4bd7-9910-66138e992c94	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.908
bbd2131f-c789-4e79-ae83-589692c787c6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.946
2967a370-a7cd-4ceb-99bd-5d7fbb4689d4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:10.987
67a61f7c-e9cd-4b7b-90fb-9f767cda03ba	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.055
d2913847-30df-4f87-9d33-09a1e7426edf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.124
7cd0c37d-da80-4e13-8f75-7c0c54aed683	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.17
58d574fc-05e0-4305-a35d-83d41a76bdfb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.231
74434f54-e23c-4262-a169-01d1a6062b13	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.289
4a6f664f-dda3-4665-a215-3151e4fba308	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.29
f11356e3-b14a-4d06-b21e-9a89254cad85	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.29
16fdb63e-a429-40ff-bf7d-5f8ab3616542	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.368
1b213a85-39ce-4720-9814-344cb416a043	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.441
926fc255-beb2-48a8-9033-89bef3d0a172	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.441
240c0602-68d1-44d0-8417-22d428a00389	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.441
1d210c16-d686-4b4f-b8df-b86d03887590	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.52
aa41b3a5-71de-45aa-b5e2-256a0c82813e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.601
360ed00c-c537-4553-954c-1af6e253b22d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.7
c5e00dac-5d01-45e6-bdd2-63b2da682d37	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.7
b6fc1155-5c29-429f-9d8d-acce91c3657f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.701
acef8f38-8521-4b7f-9b43-248b57499a03	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.782
e97b175e-cd18-4064-8b44-9490326d8f96	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:11.782
03724711-64cf-4a9b-b02f-a14104ede9c0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:44:12.078
505b47d3-46a2-4e24-8afe-709c274a068d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:10.99
2495ff7f-ef2c-4801-88d2-b91409be7016	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.059
c716eae0-fd4b-4076-bf0d-833beccc26ab	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.101
2272e97a-d063-43a8-9e1c-9591812fe49d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.157
4f37cb7a-3131-44cf-a939-437033d8f079	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.224
9f6369d5-a77a-48b6-8708-d330a9548ded	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.279
ae0cfbf2-ca1d-4316-847d-3b85d2d775cb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.332
9dd446ae-55f9-41ba-b48c-44b9723242db	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.361
ceeba4c0-42b4-4130-8534-a545e1731491	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.404
1c41c67f-6f32-4e83-a37e-408a87663ad0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.691
43283cbb-9f75-48d3-81b9-74a858bfff92	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.809
dd654404-9a9a-43c9-9e5c-9cf5414363e0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.855
79476f05-8544-42a6-acfc-ab547960cb5b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.873
d67b2fa9-5f80-4b95-b374-80cb6f9528e3	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:11.909
26e6b294-1b47-43bc-851f-ed3ff008e4b2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.031
918bf481-7285-44f1-84bb-5adf32eafac2	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.071
5afb5e02-5481-41fe-a6ef-89acecf0ab5b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.246
3d209ca4-9c88-4b0f-97f7-0839dfd30c72	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.303
993c82c7-6c91-4800-8ca1-805d6160e40e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.343
2cffc9a5-d9d7-47c3-ab50-0a5ad1dc2e1e	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.542
d3ed9e4d-cb54-49d4-be5a-0f0969f6308b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.588
940f23b0-5086-4e0a-b9ff-ead232503fe0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.635
07a15e9e-b2dc-4f43-8b8c-30ab515d686b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.739
c5f7d0bc-03d4-4f55-a7b2-18d1867e8503	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.755
fd0cc2a6-9419-49e0-9ba1-426f3291f9e1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.83
389188a8-d075-489f-8eab-b68b8199b6c1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:46:12.864
98a44aa4-e89f-4f15-985f-3ca1208fba09	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:17.885
f9ff9bbb-ff5f-4060-94f2-f29bdec78c79	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:17.96
9e436362-d94a-4753-ab7a-73724f700206	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:17.999
318cbbd7-a77c-4b97-9f86-aac4bca140c4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.022
e4de300d-397f-49cd-8ba5-e4b49e8d31eb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.083
f5e740e7-42c4-4b29-bc25-2a55c1dad05c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.14
81af35c2-ad2f-4d0f-b031-d5d14db148cd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.182
b1534549-409a-4a88-9331-c708799b36df	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.229
3c90c0c7-d129-4d58-9da8-1a17fe5a9584	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.273
6dd9b35a-8e1d-46b4-902e-34d4c8cd6521	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.326
ecfaee5b-8121-4bb2-a381-2dc5a0891293	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.35
96f6e98e-b9ad-4a10-a467-ea2687fd52ac	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.384
9c6d1949-83ae-419f-834b-4936c0efc65b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.435
761f3da4-a07c-4baf-bcb4-e79fe99976f0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.472
5c1e7856-dcb8-4970-b820-30daf8df232c	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.496
d9779cff-9347-46fa-9d96-d240d5b253cb	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.571
5f842097-943a-491b-9c2a-3da9bc07953b	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.6
1f272360-b44f-4b62-817b-093ad0a21c03	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.641
0675116c-8aa6-4417-b054-d51ce8250c55	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.701
8cd7c655-c6ee-415b-a5af-d3dafbb7f7f6	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.726
39d01f36-f190-4a62-bb02-34c4d48b2a04	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.77
ced459ab-4280-4e20-8976-9594252de2ba	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.811
b1c92812-4d54-46bc-ae11-d5a61c0595f4	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.894
3b653fa5-dfd5-4a7c-a38e-8e89a0785037	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.934
a88d88a9-e071-4133-87ef-afff7d39747d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:18.971
48523df9-6367-4bca-b171-1f0ec74fbc3d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.012
e24f26b4-42bb-4f3a-a255-6d737d8b73e0	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.049
19bd9c28-54d5-46ad-b484-852b9e61db9a	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.089
1cdf98d4-4c26-4c43-8468-999474903d57	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.206
0b93e1d8-ae0e-464d-bd47-d8328f3255be	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.362
875ed996-b661-4bd2-b0c1-1b63a56754d9	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.403
3e6c5471-fdf6-42c8-8aef-41bbea46fb9d	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.44
52b94934-588c-452e-bbd6-5c9c255792dd	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.48
a73ea781-5b8e-468f-bef7-b21e5257de64	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.591
d847641a-03e6-4473-8592-fa6d13fac953	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-01 13:49:19.618
1de0f501-597d-467b-b424-c4dff8d77b1f	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-01 13:42:02.985
e8695b85-5450-437a-8bd3-77d8e421a8d8	c8d390d0-8b02-4eda-a13d-00212e3f1d45	460f683b-080e-4a52-bc27-3bbba425b365	\N	\N	f	2025-06-01 14:09:45.395
a043f808-a167-40b9-8857-571434dfd2ac	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:49:41.367
38ae3074-a8e5-48a1-b454-7440882c9cdf	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	f	2025-06-05 19:49:41.424
8ed30e0e-9790-49b1-b59d-b72bd1cfcecc	c8d390d0-8b02-4eda-a13d-00212e3f1d45	\N	\N	\N	t	2025-06-05 19:49:39.163
1146c0ad-1268-4063-b150-e1f5bf8e40b1	c8d390d0-8b02-4eda-a13d-00212e3f1d45	39fec602-18db-43b9-8738-3deef6b9d168	\N	\N	f	2025-06-05 20:16:36.899
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Course" (id, title, description, "authorId", "createdAt", "updatedAt", category, "coverImage", level) FROM stdin;
28768407-0466-4e11-92c0-960633f98791	123	321	c8d390d0-8b02-4eda-a13d-00212e3f1d45	2025-05-27 18:50:13.707	2025-05-27 18:50:13.707	PROGRAMMING	/uploads/covers/coverImage-1748371813705-166655614.svg	BEGINNER
460f683b-080e-4a52-bc27-3bbba425b365	123	123	c8d390d0-8b02-4eda-a13d-00212e3f1d45	2025-06-01 13:51:01.794	2025-06-01 13:51:01.794	PROGRAMMING	\N	BEGINNER
39fec602-18db-43b9-8738-3deef6b9d168	312	123	c8d390d0-8b02-4eda-a13d-00212e3f1d45	2025-06-05 20:16:30.787	2025-06-05 20:16:30.787	PROGRAMMING	\N	BEGINNER
\.


--
-- Data for Name: Enrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Enrollment" ("userId", "courseId", "enrolledAt") FROM stdin;
\.


--
-- Data for Name: Option; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Option" (id, text, "isCorrect", "questionId", "createdAt", "updatedAt") FROM stdin;
5f11b37f-65aa-48a7-9320-077ecd1b004a	111	t	272dcf1f-cf2d-4bc0-ae14-90e9bbc481b5	2025-05-27 18:50:13.707	2025-05-27 18:50:13.707
d7a79401-a442-4190-a4aa-deb1ab70dc54	123	f	272dcf1f-cf2d-4bc0-ae14-90e9bbc481b5	2025-05-27 18:50:13.707	2025-05-27 18:50:13.707
d65b17d1-71f1-4341-8561-2bebb161e256	1	t	eb9557d6-9ab2-480d-bbb2-d66941d32f8a	2025-06-01 13:51:01.794	2025-06-01 13:51:01.794
550c5ca2-d1df-41b3-839f-05b0829ad3bb	123	f	eb9557d6-9ab2-480d-bbb2-d66941d32f8a	2025-06-01 13:51:01.794	2025-06-01 13:51:01.794
99aa3fb0-a33e-4599-92ec-3f28e89cbca5	123	t	74b5cc67-9d5f-41c7-96f0-3de670ee2a91	2025-06-05 20:16:30.787	2025-06-05 20:16:30.787
67203e27-279e-4b1c-ae50-e5d5b0b2e885	1	f	74b5cc67-9d5f-41c7-96f0-3de670ee2a91	2025-06-05 20:16:30.787	2025-06-05 20:16:30.787
\.


--
-- Data for Name: ProgressTracking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProgressTracking" (id, "userId", "sectionId", "completionStatus", "completedAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id, question, "testId", "createdAt", "updatedAt") FROM stdin;
272dcf1f-cf2d-4bc0-ae14-90e9bbc481b5	123	fa69fa46-aff2-403e-a6a5-76e2e9e2eabe	2025-05-27 18:50:13.707	2025-05-27 18:50:13.707
eb9557d6-9ab2-480d-bbb2-d66941d32f8a	321	f5269965-56c2-44b0-981a-08237672ae6f	2025-06-01 13:51:01.794	2025-06-01 13:51:01.794
74b5cc67-9d5f-41c7-96f0-3de670ee2a91	3123	16d961e4-796d-4f7a-8631-0fa70e616785	2025-06-05 20:16:30.787	2025-06-05 20:16:30.787
\.


--
-- Data for Name: Section; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Section" (id, title, description, "order", "courseId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Task" (id, question, "correctAnswer", "sectionId", "createdAt", "updatedAt", options) FROM stdin;
\.


--
-- Data for Name: Test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Test" (id, title, description, "passingScore", "blockId", "createdAt", "updatedAt") FROM stdin;
fa69fa46-aff2-403e-a6a5-76e2e9e2eabe	123	123	70	7bc0b7cb-34ed-475e-a816-d7f06ec93f73	2025-05-27 18:50:13.707	2025-05-27 18:50:13.707
f5269965-56c2-44b0-981a-08237672ae6f	123	123	70	a8c1bb73-7f98-4672-bb3d-fd4224651d2c	2025-06-01 13:51:01.794	2025-06-01 13:51:01.794
16d961e4-796d-4f7a-8631-0fa70e616785	123	123	70	6ea2381a-1ce7-4361-af0c-22244efcca76	2025-06-05 20:16:30.787	2025-06-05 20:16:30.787
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e4bc98fe-ca7b-40f5-b65f-fb22265b0819	7318cf99a62972314e7cbbc423987a4df929b1299e584bb87a89f81cc81bf1cd	2025-05-27 11:44:04.580905-07	20250401192448_init	\N	\N	2025-05-27 11:44:04.576694-07	1
7929298c-f0e8-4e09-84cc-b49b8c037b11	7efadbbe34b45c2705e6282b57c1b42645b3695a301230374129eb49c0b0cd0f	2025-05-27 11:44:04.582869-07	20250401192729_add_refresh_token	\N	\N	2025-05-27 11:44:04.5813-07	1
37c11cd7-f8cb-4802-910a-1d32644c2b3c	5c0e890bb5352259930058e972c98c82c660b276e5fe729fbf790c428b9d819c	2025-05-27 11:44:04.586579-07	20250401195714_update_user_model	\N	\N	2025-05-27 11:44:04.583207-07	1
c0cde08a-783c-444d-a58c-4a50012252e4	31014865ddd9b66007bd1e5b140e062edd9565ee6a14fe989482a70e2086e2b2	2025-05-27 11:44:04.602611-07	20250508223126_add_favorites	\N	\N	2025-05-27 11:44:04.587056-07	1
88b50610-acfa-4a8c-a150-928554a7171a	ee7dc6fae908d566b1df095efed1516fbfeea67690781e1b657682a35e9f3149	2025-05-27 11:44:04.609441-07	20250510155758_update_courses_model	\N	\N	2025-05-27 11:44:04.602919-07	1
675c2f23-f7b6-4468-a92a-58af653d6409	ebf6a65eee65e2eba46ee22041c2416387ac0ab8240c08f8cd783bba5648145f	2025-05-27 11:44:04.614441-07	20250525122916_fix_completion_status_postgres	\N	\N	2025-05-27 11:44:04.609705-07	1
\.


--
-- Data for Name: favorite_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorite_courses ("userId", "courseId", "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, "createdAt", "updatedAt", "refreshToken", role, avatar, fullname) FROM stdin;
c8d390d0-8b02-4eda-a13d-00212e3f1d45	ggevelurl@gmail.com	$2b$12$rjCUQ0taB0Oq8JJ8hjNl4uZBXFHdRvNJsbMcMMXDjPG7AGUU4FHCe	2025-05-27 18:45:07.157	2025-06-06 16:16:36.83	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM4ZDM5MGQwLThiMDItNGVkYS1hMTNkLTAwMjEyZTNmMWQ0NSIsImlhdCI6MTc0OTIyNjU5NiwiZXhwIjoxNzQ5ODMxMzk2fQ.OYimjMXhA4wDsZwsvOs5sryW9DWu7kun7uNCsfJF-GM	USER	\N	Прощенков Кирилл Юрьевич
c1378615-d221-4d7f-aa57-e72f5c106d36	kirill.proshchenkov@nordclan.com	$2b$12$VFoRgArB6s0vpLTzfm8xhO.t159pXqC0JvfYB/aHFwPJIMb/V3FEG	2025-06-06 15:34:49.369	2025-06-06 16:25:40.516	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxMzc4NjE1LWQyMjEtNGQ3Zi1hYTU3LWU3MmY1YzEwNmQzNiIsImlhdCI6MTc0OTIyNjYwNiwiZXhwIjoxNzQ5ODMxNDA2fQ.bSiG9sGDaJQQkRuuNoR1PQwR4Y5F1SGHY6zF4pnCKz0	ADMIN	\N	Тестовое полное имя
\.


--
-- Name: Achievement Achievement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Achievement"
    ADD CONSTRAINT "Achievement_pkey" PRIMARY KEY (id);


--
-- Name: AuthorshipRequest AuthorshipRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthorshipRequest"
    ADD CONSTRAINT "AuthorshipRequest_pkey" PRIMARY KEY (id);


--
-- Name: Block Block_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Block"
    ADD CONSTRAINT "Block_pkey" PRIMARY KEY (id);


--
-- Name: Certificate Certificate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Certificate"
    ADD CONSTRAINT "Certificate_pkey" PRIMARY KEY ("userId", "courseId");


--
-- Name: CompletionStatus CompletionStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompletionStatus"
    ADD CONSTRAINT "CompletionStatus_pkey" PRIMARY KEY (_id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Enrollment Enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("userId", "courseId");


--
-- Name: Option Option_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Option"
    ADD CONSTRAINT "Option_pkey" PRIMARY KEY (id);


--
-- Name: ProgressTracking ProgressTracking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProgressTracking"
    ADD CONSTRAINT "ProgressTracking_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Section Section_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: Test Test_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: favorite_courses favorite_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_courses
    ADD CONSTRAINT favorite_courses_pkey PRIMARY KEY ("userId", "courseId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Achievement_userId_type_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Achievement_userId_type_key" ON public."Achievement" USING btree ("userId", type);


--
-- Name: CompletionStatus_userId_courseId_blockId_taskId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CompletionStatus_userId_courseId_blockId_taskId_key" ON public."CompletionStatus" USING btree ("userId", "courseId", "blockId", "taskId");


--
-- Name: ProgressTracking_userId_sectionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProgressTracking_userId_sectionId_key" ON public."ProgressTracking" USING btree ("userId", "sectionId");


--
-- Name: Test_blockId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Test_blockId_key" ON public."Test" USING btree ("blockId");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: Achievement Achievement_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Achievement"
    ADD CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AuthorshipRequest AuthorshipRequest_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AuthorshipRequest"
    ADD CONSTRAINT "AuthorshipRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Block Block_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Block"
    ADD CONSTRAINT "Block_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Certificate Certificate_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Certificate"
    ADD CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Certificate Certificate_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Certificate"
    ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CompletionStatus CompletionStatus_blockId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompletionStatus"
    ADD CONSTRAINT "CompletionStatus_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES public."Block"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CompletionStatus CompletionStatus_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompletionStatus"
    ADD CONSTRAINT "CompletionStatus_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CompletionStatus CompletionStatus_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompletionStatus"
    ADD CONSTRAINT "CompletionStatus_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CompletionStatus CompletionStatus_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompletionStatus"
    ADD CONSTRAINT "CompletionStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Course Course_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Enrollment Enrollment_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Enrollment Enrollment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Enrollment"
    ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Option Option_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Option"
    ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProgressTracking ProgressTracking_sectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProgressTracking"
    ADD CONSTRAINT "ProgressTracking_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES public."Section"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProgressTracking ProgressTracking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProgressTracking"
    ADD CONSTRAINT "ProgressTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_testId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES public."Test"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Section Section_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Section"
    ADD CONSTRAINT "Section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_sectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES public."Section"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Test Test_blockId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES public."Block"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: favorite_courses favorite_courses_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_courses
    ADD CONSTRAINT "favorite_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: favorite_courses favorite_courses_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorite_courses
    ADD CONSTRAINT "favorite_courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

