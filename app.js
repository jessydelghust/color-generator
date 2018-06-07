// INPUT CONTROLLER
var generatorController = (function() {

    // On stocke les données
    var data = {
        colorStrings: ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        generateColor: ""
    };
    
    // On généré une couleur en valeur hexadecimal
    var colorGeneration = function() {
        var num, color = "";
        for (var i = 0; i < 6; i++) {
            num = Math.floor(Math.random() * data.colorStrings.length);
            color += data.colorStrings[num];
        }
        data.colorStrings.generateColor = color;
    }

    return {
        getColor: function() {
            colorGeneration();
            return data.colorStrings.generateColor;
        },

        testing: function() {
            console.log(data);
        }
    };

})();


// UI CONTROLLER
var UIController = (function() {

    // On stocke des noms de classe
    var DOMstrings = {
        container: '.container',
        input: '.input',
        btn: '.btn',
        btnCopy: '.btn-copy'
    };

    return {
        // Appliquer la couleur au fond et mettre la valeur dans le input
        applyColor: function(color) {
            document.querySelector(DOMstrings.container).style.backgroundColor = "#" + color;
            document.querySelector(DOMstrings.input).value = color;
        },

        // Copier le contenu du input
        copy: function() {
            var copyText = document.querySelector(DOMstrings.input);
            copyText.select();
            document.execCommand("copy");
        },

        // On récupère l'objet contenant les noms de classe
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// GLOBAL APP CONTROLLER
var controller = (function(generatorCtrl, UICtrl) {

    // On défini ici les événements
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        // Au clic sur le bouton, on lance la fonction générant une couleur
        document.querySelector(DOM.btn).addEventListener('click', updateColor);
        // Au clic sur le bouton de copie, on copie dans le presse papier la couleur dans le input
        document.querySelector(DOM.btnCopy).addEventListener('click', UICtrl.copy);
    };

    // On met à jour la couleur
    var updateColor = function() {
        var color = generatorCtrl.getColor();
        UICtrl.applyColor(color);
    };

    return {
        init: function() {
            setupEventListeners();
        }
    };

})(generatorController, UIController);

controller.init();