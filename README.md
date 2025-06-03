# 💸 Gastos - Aplicación Web de Gestión de Gastos Personales · [🚀 Probar la App](https://gastos-mern-naw.vercel.app/)

**Gastos** es una aplicación web completa desarrollada con el stack **MERN** (MongoDB, Express, React, Node.js) que permite a los usuarios gestionar y visualizar sus gastos personales de forma eficiente. Está diseñada con una interfaz moderna, responsiva y fácil de usar gracias a **Tailwind CSS**, ofreciendo una experiencia fluida e intuitiva.

---

## 🚀 Características Principales

### 🔐 Autenticación y Seguridad
- Registro de usuarios con correo y contraseña.
- Inicio de sesión con autenticación mediante **JWT**.
- Protección de rutas para usuarios autenticados.
- Persistencia de sesión mediante **localStorage**.

### 📊 Dashboard Principal
- Gráfico circular con distribución de gastos por categoría.
- Filtros interactivos por categoría, mes y rango de fechas.
- Resumen y detalles de gastos por categoría con visualización detallada.

### 💼 Gestión de Gastos
- Listado completo de gastos en tabla dinámica.
- Crear, editar y eliminar gastos con descripción, monto, categoría y fecha.
- Filtros avanzados por categoría, mes y fechas.
- Visualización del total de gastos filtrados.

### 🗂️ Gestión de Categorías
- Listado de todas las categorías disponibles.
- Crear categorías personalizadas.
- Editar o eliminar categorías existentes.
- Filtros por nombre y tipo (predeterminada o personalizada).

### 👤 Perfil de Usuario
- Página para ver y actualizar la información del usuario.

---

## ⚙️ Características Técnicas

- Interfaz 100% responsiva para dispositivos móviles y de escritorio.
- Sistema de notificaciones con **react-hot-toast**.
- Manejo de errores con límites de error y mensajes claros.
- Fechas adaptadas al formato argentino (**DD/MM/YYYY**).
- Visualización de datos con gráficos interactivos mediante **Recharts**.
- Componentes reutilizables como `Table`, `FilterBar`, `ModalForm`, entre otros.

---

## 🗂️ Estructura del Proyecto

- Organización modular por funcionalidades: `pages`, `components`, `api`, `hooks`, `utils`, etc.
- Separación de lógica de negocio en hooks personalizados.
- Gestión de estado con **React Context** (autenticación) y **useState** (estado local).
- Comunicación con el backend mediante **Axios** y API REST.

---

## 🔁 Flujo de Trabajo del Usuario

1. Registro o inicio de sesión.
2. Acceso al dashboard con un resumen visual de gastos.
3. Gestión de gastos: crear, editar o eliminar.
4. Gestión de categorías personalizadas.
5. Visualización detallada con filtros dinámicos.
6. Consulta de información específica por categoría.

---

## 📌 Objetivo

Brindar una solución integral y visualmente atractiva para el **seguimiento y gestión de gastos personales**, con funcionalidades avanzadas y una experiencia de usuario de primer nivel.
