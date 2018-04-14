// TODO: Actually reference core here somehow
const core = global.core || {};
const Arm = require('./Arm.js');

// Constants
const SHOOT = 'SHOOT';
const COOL_DOWN = 'COOL_DOWN';

// Actions
const actions = {
  shoot: () => {
    type: SHOOT  
  },

  coolDown: () => {
    type: COOL_DOWN
   }
};

class BlasterArm extends Arm {

  actions = {
    shoot: SHOOT,
    coolDown: COOL_DOWN,

    // takeDamage: 'TAKE_DAMAGE',
    // powerOn: 'POWER_ON',
    // powerOff: 'POWER_OFF',
  }

  state = {
    coolDownTime: 250,
    cool: true
  }

  constructor () { }

  reducer (state, action) {
    console.log('BLASTER ARM', state, action);

    switch (action.type) {
      case SHOOT:
        return this.state = {
          ...this.state,
          cool: false,
        }
      case COOL_DOWN:
        return this.state = {
          ...this.state,
          cool: true,
        }

      // case this.actions.takeDamage:
      // case this.actions.powerOn:
      // case this.actions.powerOff:
    }

    return this.state;
  }

  shoot () {
    console.log('PEW PEW PEW'); 

    if (this.state.cool) {
      this.dispatch(actions.shoot());

      setTimeout(() => {
        this.dispatch(actions.coolDown())
      }, this.state.coolDownTime);
    }
  }

  /*
  // Actions
  //

  shootAction () {
    return {
      type: SHOOT
    }
  }

  coolDownAction () {
    return {
      type: COOL_DOWN,
      payload: {
        cool: false
      }
    }
  } */
}

export default BlasterArm;
