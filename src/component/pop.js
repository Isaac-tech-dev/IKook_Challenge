import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { XCircleIcon } from "react-native-heroicons/solid";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RheostatExample from "./Rheostat";
import Rheostat, { AreaRheostat, BarRheostat } from "react-native-rheostat";

const Pop = ({ onClose }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [minamount, setMinAmount] = useState("");
  const [maxamount, setMaxAmount] = useState("");

  const choices = ["Italian", "French", "Indian", "African", "Mediterranean"];
  //const [selectedValue, setSelectedValue] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const clearAll = () => {
    setSelectedValue(null); // Reset selected value to null
    setSearchInput(""); // Clear the search input
    setMinAmount("");
    setMaxAmount("");
  };
  return (
    <SafeAreaView className="flex-1 w-full px-2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          <Text>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <XCircleIcon size={30} color={"#000"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingVertical: 8, // Adjust the spacing as needed
            borderBottomWidth: 1, // Border width for the line
            borderBottomColor: "gray",
            width: "auto",
            marginBottom: 10,
          }}
        ></View>

        <View>
          <Text className="mb-2 text-base font-semibold">Search Menu</Text>
          <TextInput
            className="px-4 py-3 border rounded-lg border-gray-300"
            placeholder="Rice, Spaghetti, Meat, etc...."
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
          />
        </View>
        <View
          style={{
            paddingVertical: 8, // Adjust the spacing as needed
            borderBottomWidth: 1, // Border width for the line
            borderBottomColor: "gray",
            width: "auto",
          }}
        ></View>

        {/* Price per Person */}
        <Text className="mb-1 mt-2 text-base font-semibold">
          Price per Person
        </Text>
        <View>
          <RheostatExample />
        </View>
        <View className="flex-row justify-between items-center mb-2 px-4">
          {/* First Side*/}
          <View>
            <Text className="text-xs font-semibold mb-1">Minimum</Text>
            <View className="flex-row justify-center items-center border rounded-lg border-gray-300">
              <View className="border rounded-s-lg border-gray-300 px-3 py-2">
                <Text>$</Text>
              </View>
              <TextInput
                value={minamount}
                onChangeText={(text) => setMinAmount(text)}
                placeholder="50"
                className="px-10 py-2 border rounded-e-lg border-gray-300"
              />
            </View>
          </View>

          <View
            style={{
              paddingVertical: 8, // Adjust the spacing as needed
              borderBottomWidth: 1, // Border width for the line
              borderBottomColor: "gray",
              width: "15%",
            }}
          ></View>

          {/* Second Side*/}
          <View>
            <Text className="text-xs font-semibold mb-1">Maximum</Text>
            <View className="flex-row justify-center items-center border rounded-lg border-gray-300">
              <View className="border rounded-s-lg border-gray-300 px-3 py-2">
                <Text>$</Text>
              </View>
              <TextInput
                value={maxamount}
                onChangeText={(text) => setMaxAmount(text)}
                placeholder="2000"
                className="px-10 py-2 border rounded-e-lg border-gray-300"
              />
            </View>
          </View>
        </View>

        <View>
          <Text className="mb-2 text-base font-semibold">Cuisines</Text>
          {choices.map((choice, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <RadioButton
                value={choice}
                status={selectedValue === choice ? "checked" : "unchecked"}
                onPress={() => setSelectedValue(choice)}
              />
              <Text>{choice}</Text>
            </View>
          ))}
          <TouchableOpacity className="mb-8">
            <Text className="text-sm font-bold">View All (20)</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingVertical: 8, // Adjust the spacing as needed
            borderBottomWidth: 1, // Border width for the line
            borderBottomColor: "gray",
            width: "auto",
          }}
        ></View>

        <View className="flex-row justify-between items-center px-2 mt-3 mb-6">
          <TouchableOpacity
            onPress={clearAll}
            className="border border-gray-300 px-4 py-3 rounded-xl"
          >
            <Text>Clear All</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-black px-2 py-3 rounded-xl">
            <Text className="text-white">View 10 Menus</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pop;
