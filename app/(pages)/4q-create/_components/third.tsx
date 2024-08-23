import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image, Transformer, Text } from "react-konva";
import { ColorPicker, Button, Tooltip, QRCode } from "antd";
import { useImage } from "react-konva-utils";
import styles from "./third.module.css";
import mock from "../../../../public/images/mock_4q.png";
import Konva from "konva";
import { PiTextTBold } from "react-icons/pi";
import { HiTrash } from "react-icons/hi";
import { getShortenUrl } from "../../../../service/shorten_api";

// interface QrUrl {
//   shorten_url: string;
// }

interface TextNode {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  isEditing: boolean;
  color: string;
}

interface FormData {
    url: string;
    shorten_url?: string; 
    title: string;
}

export default function Third() {
  const [qrPosition, setQrPosition] = useState({ x: 50, y: 50 });
  const [textNodes, setTextNodes] = useState<TextNode[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [qrImageUrl, setQrImageUrl] = useState<string>("");
  const [storedFormData, setStoredFormData] = useState<FormData | null>(null);
  const [shortenUrl, setShortenUrl] = useState<string>("");
  const stageRef = useRef<Konva.Stage>(null);
  const qrImageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    const fetchShortenUrl = async () => {
        if (typeof window !== 'undefined') {
            const storedFormDataString = sessionStorage.getItem('form_data');
            if (storedFormDataString) {
                const parsedFormData = JSON.parse(storedFormDataString);
                setStoredFormData(parsedFormData);

                if (parsedFormData.url) {
                    try {
                        const shorten_url = await getShortenUrl(parsedFormData.url);
                    
                        const updatedFormData = { ...parsedFormData, shorten_url };
                        sessionStorage.setItem('form_data', JSON.stringify(updatedFormData));
                        setShortenUrl(shorten_url);
                        console.log('shorten:', shortenUrl);
                        
                        
                      } catch (error) {
                        console.error('Failed to shorten URL:', error);
                    }
                    
                }
            }
        }
    };

    fetchShortenUrl();
}, []);

  const convertQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const qrImageUrl = canvas.toDataURL();
      setQrImageUrl(qrImageUrl);
    }
  };

  const mockImageUrl = mock.src;
  const [backgroundImage] = useImage(mockImageUrl);
  const [qrImage] = useImage(qrImageUrl);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setQrPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (selectedId !== null) {
      const updatedTextNodes = textNodes.map((node) =>
        node.id === selectedId ? { ...node, color } : node
      );
      setTextNodes(updatedTextNodes);
    }
  };

  const addText = () => {
    if (storedFormData) {
      const newText: TextNode = {
        id: textNodes.length
          ? Math.max(...textNodes.map((node) => node.id)) + 1
          : 1,
        text: storedFormData.title,
        x: 50,
        y: 50,
        fontSize: 20,
        isEditing: false,
        color: selectedColor,
      };
      setTextNodes([...textNodes, newText]);
    }
  };

  const deleteText = () => {
    if (selectedId !== null) {
      const updatedTextNodes = textNodes.filter(
        (node) => node.id !== selectedId
      );
      setTextNodes(updatedTextNodes);
      setSelectedId(null);
    }
  };

  const handleTextDblClick = (id: number) => {
    const updatedTextNodes = textNodes.map((node) => {
      if (node.id === id) {
        node.isEditing = !node.isEditing;
      }
      return node;
    });
    setTextNodes(updatedTextNodes);
  };

  useEffect(() => {
    if (transformerRef.current && qrImageRef.current && isSelected) {
      transformerRef.current.nodes([qrImageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [qrImage, isSelected]);

  useEffect(() => {
    convertQRCode();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.subTitle}>QR의 위치를 선택해주세요.</div>
      <div className={styles.canvasContainer}>
        <div className={styles.backgroundContainer}>
          <Stage width={280} height={280} ref={stageRef}>
            <Layer>
              <Image
                image={backgroundImage}
                width={280}
                height={280}
                onClick={() => setSelected(!isSelected)}
              />
              <Image
                image={qrImage}
                width={80}
                height={80}
                x={qrPosition.x}
                y={qrPosition.y}
                draggable
                onClick={() => setSelected(!isSelected)}
                onDragEnd={handleDragEnd}
                ref={qrImageRef}
                onMouseEnter={() => {
                  if (stageRef.current) {
                    stageRef.current.container().style.cursor = "move";
                  }
                }}
                onMouseLeave={() => {
                  if (stageRef.current) {
                    stageRef.current.container().style.cursor = "default";
                  }
                }}
              />
              {isSelected && (
                <Transformer
                  enabledAnchors={[
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                  ]}
                  ref={transformerRef}
                  rotateEnabled={false}
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
              {textNodes.map((node) => (
                <Text
                  key={node.id}
                  id={`text-${node.id}`}
                  text={node.text}
                  x={node.x}
                  y={node.y}
                  fontSize={node.fontSize}
                  fill={node.color}
                  draggable
                  onClick={() => setSelectedId(node.id)}
                  onDblClick={() => handleTextDblClick(node.id)}
                />
              ))}
            </Layer>
          </Stage>
        </div>
        <div className={styles.btnContainer}>
          <Tooltip title="title 추가">
            <Button
              onClick={addText}
              type="primary"
              icon={<PiTextTBold />}
              size="small"
            />
          </Tooltip>
          <Tooltip title="텍스트를 더블클릭하면 삭제버튼이 활성화됩니다.">
            <Button
              onClick={deleteText}
              type="primary"
              icon={<HiTrash />}
              size="small"
              disabled={selectedId === null}
            />
          </Tooltip>
          <Tooltip title="텍스트를 더블클릭하고 색상을 변경할 수 있어요.">
            <ColorPicker
              value={selectedColor}
              onChange={(color) => handleColorChange(color.toHexString())}
              size="small"
            />
          </Tooltip>
        </div>
        <QRCode
          id="myqrcode"
          value={shortenUrl}
          // value="https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Whitespace"
          bgColor="#fff"
          style={{ margin: 16, display: 'none' }}
        />
      </div>
    </div>
  );
}
