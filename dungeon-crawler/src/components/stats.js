import React from "react"
import { connect } from "react-redux"


class StatsComponent extends React.Component {
    render() {
        return(
            <div className="stats">
                <div className="row">
                    <div className="img-container">
                        Level: {this.props.game.player.level}
                    </div>
                    <div className="img-container">
                        Exp: {this.props.game.player.maxExperience}/{this.props.game.player.currentExperience}

                    </div>
                    <div className="img-container">
                        Monster level: {this.props.game.level}

                    </div>

                </div>
                <div className="row">
                    <div className="img-container">
                        <img src="./img/icons/heart.png" alt="life"/>  {this.props.game.player.maxHealth}/{this.props.game.player.currentHealth}
                        <span className="tooltip">Life</span>
                    </div>
                    <div className="img-container">
                        <img src="./img/icons/shield.png" alt="damage reduction"/> {this.props.game.player.damageReduction}%
                        <span className="tooltip">Damage reduction</span>
                    </div>
                    <div className="img-container">
                        <img src="./img/icons/agility.png" alt="dodge chance"/> {this.props.game.player.dodge} %
                        <span className="tooltip">Dodge chance</span>
                    </div>
                    <div className="img-container">
                        <img src="./img/icons/sword.png" alt="attack"/> {this.props.game.player.attackLow}-{this.props.game.player.attackHigh}
                        <span className="tooltip">Attack</span>
                    </div>
                    <div className="img-container">
                        <img src="./img/icons/lifeSteal.png" alt="lifesteal"/> {this.props.game.player.lifeSteal ? "On": "Off"}
                        <span className="tooltip">Lifesteal</span>
                    </div>
                    <div className="img-container">
                        <img src="./img/icons/doubleAttack.png" alt="double attack"/> {this.props.game.player.doubleAttack ? "On" : "Off"}
                        <span className="tooltip">Double attack</span>
                    </div>
                    <div className="img-container">
                        <img src="./img/icons/vision.png" alt="vision"/> {this.props.game.player.vision}
                        <span className="tooltip">Vision</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStatesToProps(state) {
    return state
}

export default connect(mapStatesToProps)(StatsComponent)
