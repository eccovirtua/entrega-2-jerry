import React, { useState, useEffect } from "react";
import { crearRegistro } from "../api/registro.js";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import styles from "./Inicio.module.css";

export default function RegistroPracticas() {
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    carrera: "",
    correo: "",
    tipo_practica: "",
    fecha_inicio: "",
    fecha_termino: "",
    empresa: "",
    jefe: "",
    telefono: "",
    correo_empresa: "",
    foto: null,
    documento: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Cálculo automático de fecha de término (solo visual)
  useEffect(() => {
    if (form.fecha_inicio && form.tipo_practica) {
      const fechaInicio = new Date(form.fecha_inicio);
      const diasASumar = form.tipo_practica === "laboral" ? 30 : 45;
      const fechaTermino = new Date(fechaInicio);
      fechaTermino.setDate(fechaInicio.getDate() + diasASumar);
      setForm((prev) => ({
        ...prev,
        fecha_termino: fechaTermino.toISOString().split("T")[0],
      }));
    }
  }, [form.fecha_inicio, form.tipo_practica]);

  // Validaciones campo a campo
  const validateField = (id, value) => {
    let error = "";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rutRe = /^[0-9]+-[0-9kK]$/;
    const telRe = /^\d{8,12}$/;

    switch (id) {
      case "nombre":
        if (!value?.trim() || value.length < 3) error = "El nombre es obligatorio";
        break;
      case "rut":
        if (!rutRe.test(value || "")) error = "Formato inválido (Ej: 12345678-9)";
        break;
      case "correo":
      case "correo_empresa":
        if (!emailRe.test(value || "")) error = "Correo inválido";
        break;
      case "telefono":
        if (!telRe.test(value || "")) error = "Debe tener entre 8 y 12 dígitos numéricos";
        break;
      case "empresa":
      case "jefe":
      case "carrera":
        if (!value?.trim()) error = "Campo obligatorio";
        break;
      case "tipo_practica":
        if (!value) error = "Seleccione tipo";
        break;
      case "fecha_inicio":
        if (!value) error = "Seleccione fecha";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    const val = files ? files[0] : value;
    setForm((prev) => ({ ...prev, [id]: val }));
    validateField(id, val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Revalidar todo de una vez
    const camposAValidar = [
      "nombre",
      "rut",
      "carrera",
      "correo",
      "empresa",
      "jefe",
      "telefono",
      "correo_empresa",
      "tipo_practica",
      "fecha_inicio",
    ];
    const nuevosErrores = {};
    camposAValidar.forEach((c) => {
      const val = form[c];
      let before = errors[c];
      validateField(c, val);
      // El estado de errors se actualiza async; acumulamos manualmente:
      if (c === "nombre" && (!val?.trim() || val.length < 3)) nuevosErrores[c] = "El nombre es obligatorio";
      if (c === "rut" && !/^[0-9]+-[0-9kK]$/.test(val || "")) nuevosErrores[c] = "Formato inválido (Ej: 12345678-9)";
      if ((c === "correo" || c === "correo_empresa") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val || "")) nuevosErrores[c] = "Correo inválido";
      if (c === "telefono" && !/^\d{8,12}$/.test(val || "")) nuevosErrores[c] = "Debe tener entre 8 y 12 dígitos numéricos";
      if ((c === "empresa" || c === "jefe" || c === "carrera") && !val?.trim()) nuevosErrores[c] = "Campo obligatorio";
      if (c === "tipo_practica" && !val) nuevosErrores[c] = "Seleccione tipo";
      if (c === "fecha_inicio" && !val) nuevosErrores[c] = "Seleccione fecha";
      if (before) nuevosErrores[c] = before;
    });
    setErrors(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      alert("Corrige los errores antes de enviar.");
      return;
    }

    // Payload que espera el backend (/api/registro -> registroRutas)
    const payload = {
      empresa: form.empresa,
      jefe: form.jefe,
      telefono: form.telefono,
      correo_empresa: form.correo_empresa,
      tipo_practica: form.tipo_practica,
      fecha_inicio: form.fecha_inicio, // yyyy-mm-dd
      correo: form.correo, // para resolver el usuario si no hay auth
    };

    try {
      setSubmitting(true);
      const res = await crearRegistro(payload);
      alert("✅ Práctica registrada correctamente.");
      console.log("Registro creado:", res.data);

      // Reset
      setForm({
        nombre: "",
        rut: "",
        carrera: "",
        correo: "",
        tipo_practica: "",
        fecha_inicio: "",
        fecha_termino: "",
        empresa: "",
        jefe: "",
        telefono: "",
        correo_empresa: "",
        foto: null,
        documento: null,
      });
      setErrors({});
    } catch (err) {
      console.error("Error al guardar:", err?.response?.data || err);
      alert(err?.response?.data?.error || "Ocurrió un error al guardar la práctica.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <div className={styles.registroBox}>
          <h2 className={styles.registroTitle}>Registrar Práctica</h2>

          <form onSubmit={handleSubmit} className={styles.registroForm}>
            {[
              { id: "nombre", label: "Nombre Alumno", type: "text", placeholder: "Ej: Juan Pérez" },
              { id: "rut", label: "RUT", type: "text", placeholder: "Ej: 21200157-0" },
              { id: "carrera", label: "Carrera", type: "text", placeholder: "Ej: Ingeniería Informática" },
              { id: "correo", label: "Correo", type: "email", placeholder: "Ej: alumno@correo.com" },
              { id: "empresa", label: "Empresa", type: "text", placeholder: "Ej: Banco de Chile" },
              { id: "jefe", label: "Jefe Directo", type: "text", placeholder: "Ej: Carlos Muñoz" },
              { id: "telefono", label: "Contacto Teléfono", type: "tel", placeholder: "Ej: 987654321" },
              { id: "correo_empresa", label: "Correo Empresa", type: "email", placeholder: "Ej: empresa@correo.cl" },
            ].map((campo) => (
              <div key={campo.id}>
                <label className={styles.registroLabel}>{campo.label}:</label>
                <input
                  id={campo.id}
                  type={campo.type}
                  placeholder={campo.placeholder}
                  value={form[campo.id]}
                  onChange={handleChange}
                  className={`${styles.registroInput} ${
                    errors[campo.id] ? styles.inputError : form[campo.id] ? styles.inputOk : ""
                  }`}
                  required
                />
                {errors[campo.id] && <p className={styles.registroError}>{errors[campo.id]}</p>}
              </div>
            ))}

            {/* Tipo de práctica */}
            <div>
              <label className={styles.registroLabel}>Tipo de práctica:</label>
              <select
                id="tipo_practica"
                value={form.tipo_practica}
                onChange={handleChange}
                required
                className={styles.registroInput}
              >
                <option value="">Seleccione...</option>
                <option value="laboral">Laboral (240 hrs)</option>
                <option value="profesional">Profesional (360 hrs)</option>
              </select>
              {errors.tipo_practica && <p className={styles.registroError}>{errors.tipo_practica}</p>}
            </div>

            {/* Fechas */}
            <div className={styles.registroFechas}>
              <div>
                <label className={styles.registroLabel}>Fecha inicio:</label>
                <input
                  type="date"
                  id="fecha_inicio"
                  value={form.fecha_inicio}
                  onChange={handleChange}
                  required
                  className={styles.registroInput}
                />
                {errors.fecha_inicio && <p className={styles.registroError}>{errors.fecha_inicio}</p>}
              </div>
              <div>
                <label className={styles.registroLabel}>Fecha término:</label>
                <input
                  type="date"
                  id="fecha_termino"
                  value={form.fecha_termino}
                  readOnly
                  className={`${styles.registroInput} ${styles.inputReadOnly}`}
                />
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className={styles.button}
              style={{ width: "100%" }}
              disabled={submitting}
            >
              {submitting ? "Guardando..." : "Guardar Práctica"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
