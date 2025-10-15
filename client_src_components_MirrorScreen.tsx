import { motion } from "framer-motion";
import mirrorImage from "@assets/generated_images/Mirror_mode_welcome_screen_cf2cf56b.png";

interface MirrorScreenProps {
  onWakeUp: () => void;
}

export default function MirrorScreen({ onWakeUp }: MirrorScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black cursor-pointer"
      onClick={onWakeUp}
      data-testid="button-mirror-wakeup"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
        <img
          src={mirrorImage}
          alt="Mirror reflection"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <p className="font-serif text-3xl text-primary text-center px-12">
          Touch to Begin Your Style Journey
        </p>
      </motion.div>
    </motion.div>
  );
}
