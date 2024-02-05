import React from "react";
import { View, Text} from "react-native";
import { styled } from "nativewind";

type props = {
    title: string;
    content?: string;
    
};


const StyledLinha = ({
    title, content, ...rest
}: props) => {
    return (
        <View  
            {...rest}
            className='flex  flex-wrap items-center w-80 mb-3 px-3'
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
const Linha = styled(StyledLinha);


export default Linha;