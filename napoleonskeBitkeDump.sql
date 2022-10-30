--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bitka; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bitka (
    datum date NOT NULL,
    pobjednik character varying(3) NOT NULL,
    sudionici character varying(40) NOT NULL,
    voditeljpobjednika character varying(100) NOT NULL,
    tijekomkojekoalicije integer NOT NULL,
    trajanjeudanima integer NOT NULL,
    ukupnoranjenihmrtvih integer NOT NULL,
    ime character varying(100) NOT NULL,
    lokacijaid integer NOT NULL
);


ALTER TABLE public.bitka OWNER TO postgres;

--
-- Name: lokacija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lokacija (
    zemljaid character varying(3) NOT NULL,
    "imeLokacije" character varying(40) NOT NULL,
    lokacijaid integer NOT NULL
);


ALTER TABLE public.lokacija OWNER TO postgres;

--
-- Data for Name: bitka; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bitka (datum, pobjednik, sudionici, voditeljpobjednika, tijekomkojekoalicije, trajanjeudanima, ukupnoranjenihmrtvih, ime, lokacijaid) FROM stdin;
1796-11-15	FRA	FRA VS AUS	Napoleon Bonaparte	1	3	7400	Bitka za Arcole	1
1798-07-21	FRA	FRA VS OTT, MAM	Napoleon Bonaparte	2	1	10309	Bitka za Piramide	2
1805-10-16	FRA	FRA VS AUS	Napoleon Bonaparte	3	4	5000	Bitka za Ulm	3
1805-12-02	FRA	FRA VS AUS, RUS	Napoleon Bonaparte	3	1	24279	Bitka za Austerlitz	4
1808-08-21	UK	FRA VS UK, POR	Arthur Wellesley	0	1	2888	Bitka za Vimiero	5
1809-05-21	AUS	FRA VS AUS	Nadvojvoda Karlo	5	2	42880	Bitka za Aspern-Essling	6
1812-09-07	NUL	FRA VS RUS	NUL	0	1	85000	Bitka za Borodino	7
1814-03-12	FRA	FRA VS RUS, PRU	Napoleon Bonaparte	6	2	8700	Bitka za Reims	8
1815-06-16	FRA	FRA VS PRU	Napoleon Bonaparte	7	1	35500	Bitka za Ligny	9
1815-06-18	UK	FRA VS UK, PRU	Arthur Wellesley, Gebhard Leberecht von Blücher	7	1	59000	Bitka za Waterloo	10
1799-07-25	FRA	FRA VS OTT	Napoleon Bonaparte	2	1	15820	Prva bitka za Abukir	11
1801-03-08	UK	FRA VS UK	Ralph Abercromby	2	1	1130	Druga bitka za Abukir	11
\.


--
-- Data for Name: lokacija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lokacija (zemljaid, "imeLokacije", lokacijaid) FROM stdin;
ITA	Arcole	1
EGY	Embabeh	2
GER	Ulm	3
CZE	Austerlitz	4
AUS	Lobau	6
RUS	Borodino	7
FRA	Reims	8
BEL	Ligny	9
BEL	Waterloo	10
POR	Vimiero	5
EGY	Abu Qir	11
\.


--
-- Name: lokacija lokacija_ime_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacija
    ADD CONSTRAINT lokacija_ime_key UNIQUE ("imeLokacije");


--
-- Name: lokacija lokacija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacija
    ADD CONSTRAINT lokacija_pkey PRIMARY KEY (lokacijaid);


--
-- Name: bitka pkc_datumpobjednik; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bitka
    ADD CONSTRAINT pkc_datumpobjednik PRIMARY KEY (datum, pobjednik);


--
-- Name: bitka bitka_lokacijaid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bitka
    ADD CONSTRAINT bitka_lokacijaid_fkey FOREIGN KEY (lokacijaid) REFERENCES public.lokacija(lokacijaid);


--
-- PostgreSQL database dump complete
--

