module.exports = {


  friendlyName: 'Validate Inputs',


  description: 'Expand the validation of other machines ',


  extendedDescription: 'Give you the power to add custom validation to the inputs, by adding new rules',


  cacheable: false,


  sync: false,


  inputs: {

    inputs: {
      description: 'Inputs of the machine you want to expand its validation', 
      required: true, 
      example: {}
    }

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits) {


    const machineInputs = inputs.inputs; 
    for (key in machineInputs){
      const currentInput = machineInputs[key]; 

      if (currentInput.hasOwnProperty('shouldExictWith')){
        if (!currentInput['shouldExictWith'].constructor === Array){
         return exits.error(new Error('shouldExictWith should be an array'));  
        }

        currentInput['shouldExictWith'].forEach(function(input){
         if (!machineInputs.hasOwnProperty(input)){
          return exits.error(new Error('The input ' + input + ' should exict with ' + currentInput['shouldExictWith']) + ' and one of them is missing !!!'); 
         } 
        }); 
         
      }

      // if (currentInput.hasOwnProperty('shouldNotExictWith')){
      //   if (!currentInput['shouldNotExictWith'].constructor === Array){
      //    return exits.error(new Error('shouldNotExictWith should be an array'));  
      //   }
      //   // check tha tthe other input/inputs doesn't exict
      // }
    }

    return exits.success();
  },



};