// Función para verificar si una URL es válida
export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  // Función para realizar todas las validaciones
  export const validations = (name, value) => {
    const errors = {};
  
    if (name === "name") {
      // Validaciones para el nombre
    } else if (name === "image") {
      if (!value.trim()) {
        errors.image = "Insert image url";
      } else if (!isValidUrl(value)) {
        errors.image = "Insert a valid image url";
      }
    } else if (name === "weight") {
      if (!value.trim()) {
        errors.weight = "Insert weight";
      }
      // Otras validaciones para weight si es necesario
    } else if (name === "height") {
      if (!value.trim()) {
        errors.height = "Insert height";
      }
      // Otras validaciones para height si es necesario
    } else if (name === "life_span") {
      if (!value.trim()) {
        errors.life_span = "Insert life span";
      }
      // Otras validaciones para life_span si es necesario
    }
  
    return errors;
  };