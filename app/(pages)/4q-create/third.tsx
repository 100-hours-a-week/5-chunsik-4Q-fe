import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import { useImage } from 'react-konva-utils';
import styles from './third.module.css';
import mock from '../../../public/images/mock_4q.png';
import qr from '../../../public/images/qr.png';
import Konva from "konva";
import isDragging = Konva.isDragging;

export default function Third() {
    const [qrPosition, setQrPosition] = useState({ x: 50, y: 50 });
    const stageRef = useRef<Konva.Stage>(null);
    const qrImageRef = useRef<Konva.Image>(null);
    const transformerRef = useRef<Konva.Transformer>(null);
    const [isSelected, setSelected] = useState(false);
    const [backgroundImage] = useImage(mock.src);
    const [qrImage] = useImage(qr.src);

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        setQrPosition({
            x: e.target.x(),
            y: e.target.y(),
        });
    };

    const handleSaveClick = () => {
        setSelected(false);
        if (stageRef.current) {
            const uri = stageRef.current.toDataURL();
            const link = document.createElement('a');
            link.download = 'photoQr.png';
            link.href = uri;
            link.click();
        }
    };

    useEffect(() => {
        if (transformerRef.current && qrImageRef.current && isSelected) {
            transformerRef.current.nodes([qrImageRef.current]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    }, [qrImage, isSelected]);


    return (
        <div className={styles.container} >
            <div className={styles.subTitle}>
                QR의 위치를 선택해주세요.
            </div>
            <div className={styles.canvasContainer}>
                <div className={styles.backgroundContainer}>
                    <Stage width={300} height={400} ref={stageRef} >
                        <Layer>
                            <Image
                                image={backgroundImage}
                                width={240}
                                height={360}
                                x={18}
                                y={15}
                                onClick={() => setSelected(!isSelected)}
                            />
                            <Image
                                image={qrImage}
                                width={100}
                                height={100}
                                x={qrPosition.x}
                                y={qrPosition.y}
                                draggable
                                onDragEnd={handleDragEnd}
                                onClick={() => setSelected(!isSelected)}
                                ref={qrImageRef}
                                // scaleX={isDragging ? 1.2 : 1}
                                // scaleY={isDragging ? 1.2 : 1}
                            />
                            {isSelected && (
                                <Transformer
                                    enabledAnchors={['top-left', 'top-right', 'bottom-left',  'bottom-right']}
                                    ref={transformerRef}
                                    rotateEnabled={false} // 회전 불가능하게 설정
                                    keepRatio={true}
                                    boundBoxFunc={(oldBox, newBox) => {
                                        const boxSize = Math.max(newBox.width, newBox.height);
                                        return {
                                            x: newBox.x,
                                            y: newBox.y,
                                            width: boxSize,
                                            height: boxSize,
                                            rotation: oldBox.rotation,
                                        };
                                    }}
                                />
                            )}
                        </Layer>
                    </Stage>
                </div>
            </div>
            {/*<button onClick={handleSaveClick} className={styles.saveButton}>*/}
            {/*    Save Image*/}
            {/*</button>*/}
        </div>
    );
}


