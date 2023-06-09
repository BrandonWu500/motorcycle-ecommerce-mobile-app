import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetOrderQuery } from "../store/apiSlice";
import { FontAwesome5 } from "@expo/vector-icons";
import formatCurrency from "../utils/formatCurrency";
import OrderItem from "./OrderItem";
const SearchResults = ({ searchTerm }) => {
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm);
  const { data, isLoading, error } = useGetOrderQuery(filteredSearchTerm);

  useEffect(() => {
    if (searchTerm.length >= 5) {
      setFilteredSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) return <Text>{error?.data?.message}</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {Object.entries(data.customer).map(([key, val]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.key}>{key}:</Text>
            <Text style={styles.val}>{val}</Text>
          </View>
        ))}
        <View style={styles.row}>
          <Text style={styles.key}>Total:</Text>
          <Text style={styles.val}>{formatCurrency(data.total)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Status:</Text>
        </View>
        <View style={styles.rowSpread}>
          <View style={styles.col}>
            <Text style={styles.valBold}>Preparing</Text>
            <FontAwesome5 name="motorcycle" size={24} color="black" />
          </View>
          <Text style={styles.val}>Shipped</Text>
          <Text style={styles.val}>Delivered</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Items:</Text>
        </View>
        {/* do product lookup by id */}
        {/* display image, name, price and quantity of each bike */}
        {data.items.map((item) => (
          <OrderItem
            productId={item.product}
            quantity={item.quantity}
            key={item.product}
          />
        ))}
      </View>
    </ScrollView>
  );
};
export default SearchResults;
const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
  },
  rowSpread: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  key: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: 500,
  },
  val: {
    fontSize: 16,
  },
  valBold: {
    fontSize: 16,
    fontWeight: 500,
  },
  col: {
    alignItems: "center",
    gap: 10,
  },
});
