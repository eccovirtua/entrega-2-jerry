import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';

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

  //  Cálculo automático de fecha de término
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

  //  Validaciones
  const validateField = (id, value) => {
    let error = "";

    switch (id) {
      case "nombre":
        if (!value.trim()) error = "El nombre es obligatorio";
        else if (value.length < 3) error = "Debe tener al menos 3 caracteres";
        break;

      case "rut":
        if (!/^[0-9]+-[0-9kK]$/.test(value))
          error = "Formato inválido (Ej: 12345678-9)";
        break;

      case "correo":
      case "correo_empresa":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Correo inválido";
        break;

      case "telefono":
        if (!/^\d{8,12}$/.test(value))
          error = "Debe tener entre 8 y 12 dígitos numéricos";
        break;

      case "empresa":
      case "jefe":
      case "carrera":
        if (!value.trim()) error = "Campo obligatorio";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    const val = files ? files[0] : value;
    setForm({ ...form, [id]: val });
    validateField(id, val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    Object.entries(form).forEach(([id, value]) => validateField(id, value));

    const hasErrors = Object.values(errors).some((err) => err);
    if (hasErrors) {
      alert(" Corrige los errores antes de enviar.");
      return;
    }

    alert("✅ Práctica registrada correctamente.");
    console.log("Formulario enviado:", form);
  };

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <div className={styles.registroBox}>
          <h2 className={styles.registroTitle}>
            Registrar Práctica
          </h2>
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
                  className={`${styles.registroInput} ${errors[campo.id] ? styles.inputError : form[campo.id] ? styles.inputOk : ""}`}
                  required
                />
                {errors[campo.id] && (
                  <p className={styles.registroError}>{errors[campo.id]}</p>
                )}
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
              </div>
              <div>
                <label className={styles.registroLabel}>Fecha término:</label>
                <input
                  type="date"
                  id="fecha_termino"
                  value={form.fecha_termino}
                  readOnly
                  className={styles.registroInput + " " + styles.inputReadOnly}
                />
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className={styles.button}
              style={{ width: '100%' }}
            >
              Guardar Práctica
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}