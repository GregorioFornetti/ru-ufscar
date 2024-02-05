import React from "react";
import { View, Text} from "react-native";
import { styled } from "nativewind";

type props = {
    title?: string;
    content?: string;
    
};


const StyledLinha = ({
    title, content, ...rest
}: props) => {
    return (
        <View  
            {...rest}
            className='flex flex-row  flex-wrap items-center justify-between  w-80 mb-3 px-6'
        >
            <Text className="text-base self-start mr-1 font-bold text-white bg-emerald-900 px-1">
                {title}
            </Text>

            <Text className="text-sm self-start text-wrap break-all text-gray-500">
                {content}
            </Text>   
        </View>
    );
};
const LinhaInfo = styled(StyledLinha);


export default LinhaInfo;