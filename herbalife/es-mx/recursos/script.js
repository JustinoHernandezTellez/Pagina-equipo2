document.addEventListener('DOMContentLoaded', () => {
    const tipoPlanSelect = document.getElementById('tipo-plan');
    const varianteSnacks = document.getElementById('variante-snacks');
    const varianteMacronutrientes = document.getElementById('variante-macronutrientes');
    const planForm = document.getElementById('plan-form');
    const resultadoPlan = document.getElementById('resultado-plan');

    // Muestra u oculta las variantes del formulario
    tipoPlanSelect.addEventListener('change', (event) => {
        if (event.target.value === 'snacks-comidas') {
            varianteSnacks.style.display = 'block';
            varianteMacronutrientes.style.display = 'none';
        } else {
            varianteSnacks.style.display = 'none';
            varianteMacronutrientes.style.display = 'block';
        }
    });

    // Procesa el formulario al hacer clic en el botón "Generar Plan"
    planForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario
        let planGenerado = '';

        const tipoPlan = tipoPlanSelect.value;

        if (tipoPlan === 'snacks-comidas') {
            const snacksSeleccionados = Array.from(document.querySelectorAll('#variante-snacks input[name="snack"]:checked'))
                                             .map(el => el.value);
            const comidasSeleccionadas = Array.from(document.querySelectorAll('#variante-snacks input[name="comida"]:checked'))
                                              .map(el => el.value);
            const jugosSeleccionados = Array.from(document.querySelectorAll('#variante-snacks input[name="jugo"]:checked'))
                                            .map(el => el.value);

            planGenerado = generarPlanSnacksComidas(snacksSeleccionados, comidasSeleccionadas, jugosSeleccionados);

        } else if (tipoPlan === 'macronutrientes') {
            const proteinas = document.getElementById('proteinas').value;
            const carbohidratos = document.getElementById('carbohidratos').value;
            const grasas = document.getElementById('grasas').value;

            planGenerado = generarPlanMacronutrientes(proteinas, carbohidratos, grasas);
        }
        
        // Muestra el resultado en la página
        resultadoPlan.innerHTML = planGenerado;
        resultadoPlan.style.display = 'block';
    });

    // Función para generar el plan de snacks y comidas
    function generarPlanSnacksComidas(snacks, comidas, jugos) {
        let html = '<h3>Tu Plan Basado en Menú</h3>';
        if (snacks.length > 0) {
            html += '<h4>Snacks Sugeridos:</h4><ul>' + snacks.map(item => `<li>${item}</li>`).join('') + '</ul>';
        }
        if (comidas.length > 0) {
            html += '<h4>Comidas Sugeridas:</h4><ul>' + comidas.map(item => `<li>${item}</li>`).join('') + '</ul>';
        }
        if (jugos.length > 0) {
            html += '<h4>Licuados y Jugos Sugeridos:</h4><ul>' + jugos.map(item => `<li>${item}</li>`).join('') + '</ul>';
        }
        if (snacks.length === 0 && comidas.length === 0 && jugos.length === 0) {
            html += '<p>No seleccionaste ninguna opción. Por favor, elige algunos elementos para generar tu plan.</p>';
        }
        return html;
    }

    // Función para generar el plan de macronutrientes
    function generarPlanMacronutrientes(proteinas, carbohidratos, grasas) {
        let html = '<h3>Tu Plan Basado en Macronutrientes</h3>';
        html += `<p>Necesitas consumir un plan con las siguientes cantidades diarias:</p>`;
        html += '<ul>';
        html += `<li>**Proteínas:** ${proteinas || 0} gramos</li>`;
        html += `<li>**Carbohidratos:** ${carbohidratos || 0} gramos</li>`;
        html += `<li>**Grasas:** ${grasas || 0} gramos</li>`;
        html += '</ul>';
        html += `<p>*(Nota: Para obtener un plan detallado, esta información debe ser evaluada por un nutricionista profesional).*</p>`;
        return html;
    }

});
