"use client";

import styles from "./intro.module.css";
import step1 from "../../../../../public/images/step1.gif";
import step2 from "../../../../../public/images/step2.gif";
import step3 from "../../../../../public/images/step3.gif";
import step1_icon from "../../../../../public/images/icon/step1_icon.png";
import step2_icon from "../../../../../public/images/icon/step2_icon.png";
import step3_icon from "../../../../../public/images/icon/step3_icon.png";
import { motion } from "motion/react";

import Link from "next/link";
import { useRef } from "react";

export default function Intro() {
  const scrollRef = useRef(null);

  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ root: scrollRef, once: false }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2 
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
          }}
          className={styles.title}
        >
          간편하게 포토큐알을 만들어보세요
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
          }}
          className={styles.subTitle}
        >
          바로 사용할 수 있는 포토큐알, 1분이면 충분해요. <br />
          AI가 어울리는 이미지를 제작해줄거에요.
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
          }}
          className={styles.tryBtnContainer}
        >
          <Link href="/4q-create" className={styles.tryBtn}>
            4Q 생성하러가기
          </Link>
        </motion.div>
      </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className={styles.stepsContainer}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
            }}
            className={styles.title}
          >
            4Q를 만드는 3단계
          </motion.div>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
            }}
            className={`${styles.stepItem} stepItem`}
          >
            <div className={styles.stepIndicator}>STEP 1</div>
            <div className={styles.stepTitle}>필요한 정보를 입력해주세요</div>
            <div className={styles.stepImg}>
              <img src={step1.src} alt="step1_intro" />
            </div>
            <img
              src={step1_icon.src}
              alt="step1_icon"
              className={styles.rightIcon}
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
            }}
            className={`${styles.stepItem} stepItem`}
          >
            <div className={styles.stepIndicator}>STEP 2</div>
            <div className={styles.stepTitle}>배경이미지를 선택해주세요</div>
            <div className={styles.stepImg}>
              <img src={step2.src} alt="step2_intro" />
            </div>
            <img
              src={step2_icon.src}
              alt="step2_icon"
              className={styles.rightIcon}
            />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
            }}
            className={`${styles.stepItem} stepItem`}
          >
            <div className={styles.stepIndicator}>STEP 3</div>
            <div className={styles.stepTitle}>QR의 위치를 조정해주세요</div>
            <div className={styles.stepImg}>
              <img src={step3.src} alt="step3_intro" />
            </div>
            <img
              src={step3_icon.src}
              alt="step3_icon"
              className={styles.rightIcon}
            />
          </motion.div>
        </motion.div>
      </div>
  );
}
