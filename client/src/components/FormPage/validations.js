const validations = (data) => {
    const errors = {};
  
    var regex = /^[a-zA-Z\s]*$/;
  
    if (!regex.test(data.name)) {
      errors.name = "Insert name with letters only";
    } else if (data.name.trim() === "") {
      errors.name = "Insert name";
    } else if (data.name.length > 10) {
      errors.name = "Insert name with less than 10 letters";
    }
  
    if (data.image.trim() === "") {
      errors.image = "Insert image url";
    }
  
    var height = data.height.split("-").map((numero) => parseInt(numero.trim()));
    if (
      height.length !== 2 ||
      isNaN(height[0]) || isNaN(height[1]) ||
      height[0] > height[1]
    ) {
      errors.height = "Insert a min and a max";
    } else if (data.height.trim() === "") {
      errors.height = "Insert a min and a max";
    }
  
    var weight = data.weight.split("-").map((numero) => parseInt(numero.trim()));
    if (
      weight.length !== 2 ||
      isNaN(weight[0]) || isNaN(weight[1]) ||
      weight[0] > weight[1]
    ) {
      errors.weight = "Insert a min and a max";
    } else if (data.weight.trim() === "") {
      errors.weight = "Insert a min and a max";
    }
  
    var yearsNumeric = parseInt(data.life_span.match(/\d+/));
    
    if (isNaN(yearsNumeric) || yearsNumeric < 0 || yearsNumeric > 20) {
      errors.life_span = "Insert life span";
    } else if(data.life_span.trim() === "") {
      errors.life_span = "Insert life span";
    }
  
    if (data.temperaments?.length < 1) {
      errors.temperament = "Insert Temperament";
    }
  
    return errors;
  };
  
  export default validations;