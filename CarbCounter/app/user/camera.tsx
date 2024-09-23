import {
    CameraView,
    useCameraPermissions,
    CameraPictureOptions
} from "expo-camera";
import { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<any>(null)
    const cameraRef = useRef<CameraView | null>(null)
    const facing = "back"

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center">
                <Text className="text-center pb-2.5">Precisamos do acesso à câmera para tirar foto da sua refeição.</Text>
                <Button onPress={requestPermission}>
                    <Text>Permitir</Text>
                </Button>
            </View>
        );
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const options: CameraPictureOptions = {
                quality: 0.5,
                base64: true,
                exif: false,
                imageType: "png"
            }

            const takedPhoto = await cameraRef.current.takePictureAsync(options)
            setPhoto(takedPhoto)
            router.replace({
                pathname: "/user/meal/register",
                params: {
                    imageData: takedPhoto?.base64
                }
            })
        }
    }
    return (
        <View className="flex-1 justify-center">
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <Box className="flex-1 items-center bg-transparent m-16">
                    <Button
                        action="secondary"
                        className="absolute bottom-2 bg-white w-20 h-20 rounded-full items-center justify-center p-0"
                        onPress={handleTakePhoto}
                    >
                        <Ionicons name="camera" color={"black"} size={40} />
                    </Button>
                </Box>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    }
});