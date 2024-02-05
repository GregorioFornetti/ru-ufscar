import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import LinhaInfo from "./internoInfo";

type props = {
  title: string;
  contentOne?: string;
  contentTwo?: string;
  contentThree?: string;
  titleOne?: string;
  titleTwo?: string;
  titleThree?: string;
};

type valoresProps = {
  category: string;
  price: number;
};

type valorProps = {
  valores: valoresProps[];
};

const StyledHorario = ({
  title,
  contentOne,
  contentTwo,
  contentThree,
  titleOne,
  titleTwo,
  titleThree,
  ...rest
}: props) => {
  if (contentTwo === "undefined - undefined") {
    contentTwo = "Não informado";
  }

  if (contentOne === "undefined - undefined") {
    contentOne = "Não informado";
  }
  return (
    <View
      {...rest}
      className="flex items-center p-4 px-4 rounded-md w-80 mb-6 border-2 border-b-8 border-emerald-700"
      // sombra no card
    >
      <Text className="text-2xl font-bold mb-3 self-center text-emerald-900">
        {title}
      </Text>

      {titleOne && <LinhaInfo title={titleOne} content={contentOne} />}
      {titleTwo && (
        <LinhaInfo title={titleTwo} content={contentTwo ?? "Não informado"} />
      )}
    </View>
  );
};
const Horario = styled(StyledHorario);

// função que remove o que está entre parenteses da string
function removeParentheses(str: string) {
  return str.replace(/ *\([^)]*\) */g, "");
}
// função que remove a plavra "categoria" da string
function removeCategory(str: string) {
  return str.replace("categoria", "");
}

const StyledValores = ({ valores }: valorProps) => {
  return (
    <View className="flex items-center p-4 px-4 rounded-md w-80 mb-6 border-2 border-b-8 border-emerald-700">
      <Text className="text-2xl font-bold mb-3 self-center text-emerald-900">
        Valores
      </Text>

      {valores &&
        valores.map((valor: valoresProps) => (
          <LinhaInfo
            key={valor.category}
            title={removeCategory(removeParentheses(valor.category))}
            content={"R$" + valor.price.toFixed(2).toString()}
          />
        ))}
    </View>
  );
};
const Valores = styled(StyledValores);

export { Horario, Valores };
