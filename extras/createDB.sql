--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-06-11 09:05:26

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
-- TOC entry 4784 (class 1262 OID 16398)
-- Name: TP08-DAI; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "TP08-DAI" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';


ALTER DATABASE "TP08-DAI" OWNER TO postgres;

\connect -reuse-previous=on "dbname='TP08-DAI'"

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
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4785 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: provinces; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    full_name character varying NOT NULL,
    latitude double precision,
    longitude double precision,
    display_order integer,
    name character varying NOT NULL
);


ALTER TABLE public.provinces OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.provinces ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.provinces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4778 (class 0 OID 16400)
-- Dependencies: 216
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (1, 'Buenos Aires', -36.6769, -60.5588, 1, 'Buenos Aires');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (2, 'Catamarca', -28.4696, -65.7852, 2, 'Catamarca');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (3, 'Chaco', -26.3864, -60.7653, 3, 'Chaco');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (4, 'Chubut', -43.7886, -68.5264, 4, 'Chubut');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (5, 'Córdoba', -31.3993, -64.2644, 5, 'Córdoba');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (6, 'Corrientes', -27.4692, -58.8306, 6, 'Corrientes');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (7, 'Entre Ríos', -32.0589, -59.2013, 7, 'Entre Ríos');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (8, 'Formosa', -24.8958, -60.4549, 8, 'Formosa');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (9, 'Jujuy', -23.3193, -65.7643, 9, 'Jujuy');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (10, 'La Pampa', -37.1316, -65.4467, 10, 'La Pampa');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (11, 'La Rioja', -29.4131, -66.8558, 11, 'La Rioja');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (12, 'Mendoza', -34.7876, -68.4382, 12, 'Mendoza');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (13, 'Misiones', -27.4269, -55.9467, 13, 'Misiones');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (14, 'Neuquén', -38.6418, -70.1186, 14, 'Neuquén');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (15, 'Río Negro', -40.8261, -63, 15, 'Río Negro');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (16, 'Salta', -24.7998, -65.4117, 16, 'Salta');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (17, 'San Juan', -30.8654, -68.8895, 17, 'San Juan');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (18, 'San Luis', -33.7577, -66.0281, 18, 'San Luis');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (19, 'Santa Cruz', -48.8155, -69.9558, 19, 'Santa Cruz');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (20, 'Santa Fe', -30.7069, -60.95, 20, 'Santa Fe');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (21, 'Santiago del Estero', -27.7834, -64.2642, 21, 'Santiago del Estero');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (22, 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', -54.4296, -67.1955, 22, 'Tierra del Fuego');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (23, 'Tucumán', -26.8222, -65.2226, 23, 'Tucumán');
INSERT INTO public.provinces OVERRIDING SYSTEM VALUE VALUES (24, 'Ciudad Autónoma de Buenos Aires', -34.6037, -58.3816, 24, 'CABA');


--
-- TOC entry 4786 (class 0 OID 0)
-- Dependencies: 215
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.provinces_id_seq', 24, true);


-- Completed on 2026-06-11 09:05:26

--
-- PostgreSQL database dump complete
--

