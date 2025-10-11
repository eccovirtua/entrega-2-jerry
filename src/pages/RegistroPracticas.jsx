import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="bg-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <img src="/vite.svg" alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl font-semibold">
              Sistema de Gestión de Prácticas
            </h1>
          </div>
          <nav className="mt-2 sm:mt-0">
            <ul className="flex gap-4 text-sm">
              <li><Link to="/" className="hover:text-yellow-300">Inicio</Link></li>
              <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
              <li><Link to="/registro" className="font-bold text-yellow-400">Registro</Link></li>
              <li><Link to="/documentos" className="hover:text-yellow-300">Documentación</Link></li>
              <li><Link to="/reportes" className="hover:text-yellow-300">Reportes</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* FORMULARIO */}
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Registrar Práctica
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-gray-700 font-medium mb-1">{campo.label}:</label>
                <input
                  id={campo.id}
                  type={campo.type}
                  placeholder={campo.placeholder}
                  value={form[campo.id]}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 focus:outline-none transition ${
                    errors[campo.id]
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : form[campo.id]
                      ? "border-green-400 focus:ring-2 focus:ring-green-300"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                  }`}
                  required
                />
                {errors[campo.id] && (
                  <p className="text-red-500 text-sm mt-1">{errors[campo.id]}</p>
                )}
              </div>
            ))}

            {/* Tipo de práctica */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tipo de práctica:</label>
              <select
                id="tipo_practica"
                value={form.tipo_practica}
                onChange={handleChange}
                required
                className={`w-full border rounded-md p-2 focus:outline-none transition ${
                  errors.tipo_practica
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Seleccione...</option>
                <option value="laboral">Laboral (240 hrs)</option>
                <option value="profesional">Profesional (360 hrs)</option>
              </select>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Fecha inicio:</label>
                <input
                  type="date"
                  id="fecha_inicio"
                  value={form.fecha_inicio}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Fecha término:</label>
                <input
                  type="date"
                  id="fecha_termino"
                  value={form.fecha_termino}
                  readOnly
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Guardar Práctica
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-4 text-center text-sm mt-auto">
        &copy; 2025 Sistema de Prácticas - Escuela de Informática
      </footer>
    </div>
  );
}
