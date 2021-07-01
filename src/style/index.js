import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: 40,
    width: 300,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  list_item: {
    flex: 1,
    backgroundColor: '#ebedec',
    borderBottomColor: "#888a89",
    borderBottomWidth: 2,
    flexDirection: "row"
  },
  list_img: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5
  },
  button: {
    borderWidth: 1, 
    borderRadius: 5, 
    paddingTop: 10, 
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    width: 100, 
    textAlign: "center",
  }
})

export default style;