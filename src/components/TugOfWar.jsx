import React from 'react';
import { motion } from 'framer-motion';

const TugOfWar = ({ ropePosition }) => {
    return (
        <div className="play-area">

            <div className="center-line"></div>

            <motion.div
                className="rope"
                style={{ width: '150%' }}
                animate={{ x: `${ropePosition * 20}px` }}
                transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            >
                <div className="rope-texture"></div>
                <div className="knot"></div>
            </motion.div>

            {/* Team 1 Character */}
            <motion.div
                className="character team1-char"
                style={{ left: '5%' }}
                animate={{ x: `${ropePosition * 10}px` }}
            >
                <div className="avatar">😎</div>
                <span className="team-label">TEAM 1</span>
            </motion.div>

            {/* Team 2 Character */}
            <motion.div
                className="character team2-char"
                style={{ right: '5%' }}
                animate={{ x: `${ropePosition * 10}px` }}
            >
                <div className="avatar">🤠</div>
                <span className="team-label">TEAM 2</span>
            </motion.div>

        </div>
    );
};

export default TugOfWar;
