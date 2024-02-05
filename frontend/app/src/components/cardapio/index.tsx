import React from "react";
import { View, Text} from "react-native";
import { styled } from "nativewind";
import Linha from "./internoCardapio";

type props = {
    title: string;
    main_dish?: string,
    main_dish_veg?: string,
    garnishes?: string,
    accompaniment?: string,
    salad?: string,
    dessert?: string,
};


const StyledCardapio = ({
    title, main_dish, main_dish_veg, garnishes, accompaniment, salad, dessert, ...rest
}: props) => {
    return (
        <View  
            {...rest}
            className='flex items-center p-4 px-4 rounded-md  w-80 mb-6 border-2 border-b-8 border-emerald-700' 
        >
            <Text className="text-2xl font-bold mb-3 self-center text-emerald-900">
                {title}
            </Text>
            
            <Linha
                title="Prato principal:"
                content={ main_dish }
            />
            <Linha
                title="Prato principal vegetariano:"
                content={ main_dish_veg }
            />
            <Linha
                title="Guarniçoes:"
                content={ garnishes }
            />
            <Linha
                title="Acompanhamentos:"
                content={ accompaniment }
            />
            <Linha
                title="Salada:"
                content={ salad }
            />
            <Linha
                title="Sobremesa:"
                content={ dessert }
            />
        </View>
    );
};
const Cardapio = styled(StyledCardapio);


export default Cardapio;