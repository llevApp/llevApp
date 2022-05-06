import React, {useState} from "react";
import { NativeBaseProvider, Box, Text, Heading, VStack, FormControl, Input, Link, Button, Icon, HStack, Center, Pressable } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function FooterTab() {
    const [selected, setSelected] = useState(1);
    const colorOption = "#159A9C";
    const fontSize = "15";
    return <NativeBaseProvider>
        <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
          <Center flex={1}></Center>
          <HStack bg="white" alignItems="center" safeAreaBottom shadow={9}>
            <Pressable /* cursor="pointer" */ opacity={selected === 1 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(1)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 1 ? "home" : "home-outline"} />} color={colorOption} size="xl" />
                <Text color={colorOption} fontSize={fontSize}>
                  Home
                </Text>
              </Center>
            </Pressable>
            <Pressable /* cursor="pointer" */ opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? "map-marker" : "map-marker-outline"} />} color={colorOption} size="xl" />
                <Text color={colorOption} fontSize={fontSize}>
                  Trips
                </Text>
              </Center>
            </Pressable>
            <Pressable /* cursor="pointer" */ opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
              <Center>
                <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? "account" : "account-outline"} />} color={colorOption} size="xl" />
                <Text color={colorOption} fontSize={fontSize}>
                  AccountA
                </Text>
              </Center>
            </Pressable>
          </HStack>
        </Box>
      </NativeBaseProvider>;
  }