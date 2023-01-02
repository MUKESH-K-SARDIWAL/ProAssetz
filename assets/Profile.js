import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import BackIcon from "react-native-vector-icons/AntDesign";
import StarIcon from "react-native-vector-icons/Entypo";
import EarthIcon from "react-native-vector-icons/SimpleLineIcons";
import Btn from "../reusable_component/Btn";
import LogoutModal from "../reusable_component/LogoutModal";
import Modal from "react-native-modal";
const Profile = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const whitetxt = "#FFF6E0";
  const greytxt = "#686868";
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerBox}>
          <TouchableOpacity>
            <BackIcon name="left" size={25} color={greytxt} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Montserrat-SemiBold",
              color: whitetxt,
              fontSize: 19,
            }}
          >
            Profile Details
          </Text>
          <Text style={{ width: "5%" }}></Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../../assets/profileBg.png")}
            style={styles.Bg}
          >
            <Text style={styles.Bgtxt}>K</Text>
          </ImageBackground>
          <View style={styles.Namebox}>
            <Text
              style={{
                fontFamily: "Montserrat-Medium",
                fontSize: 17,
                color: whitetxt,
              }}
            >
              Hello,{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat-Bold",
                color: "#FFB916",
                fontSize: 17,
                marginVertical: 5,
              }}
            >
              Karan L
            </Text>
          </View>
          <Text
            style={{
              color: whitetxt,
              fontFamily: "Nunito-Medium",
              marginVertical: 5,
            }}
          >
            ID 985489509XDF3
          </Text>
          <Text
            style={{
              color: greytxt,
              fontFamily: "Nunito-Medium",
              marginVertical: 5,
              fontSize: 17,
            }}
          >
            Karanladia@gmail.com
          </Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.3}>
            <View style={styles.ListBox}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/doc.png")}
                  style={{ height: 25, width: 25, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: greytxt,
                    fontSize: 15,
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  My Documents
                </Text>
              </View>
              <BackIcon name="right" size={20} color={greytxt} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3}>
            <View style={styles.ListBox}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/bank.png")}
                  style={{ height: 22, width: 22, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: greytxt,
                    fontSize: 15,
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  Banking & Payment
                </Text>
              </View>
              <BackIcon name="right" size={20} color={greytxt} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3}>
            <View style={styles.ListBox}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/account.png")}
                  style={{ height: 25, width: 25, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: greytxt,
                    fontSize: 15,
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  Account Security
                </Text>
              </View>
              <BackIcon name="right" size={20} color={greytxt} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3}>
            <View style={styles.ListBox}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/bell.png")}
                  style={{ height: 25, width: 25, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: greytxt,
                    fontSize: 15,
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  Notification
                </Text>
              </View>
              <BackIcon name="right" size={20} color={greytxt} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.3}>
            <View style={styles.ListBox}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/help.png")}
                  style={{ height: 25, width: 25, marginRight: 10 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: greytxt,
                    fontSize: 15,
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  Help & Support
                </Text>
              </View>
              <BackIcon name="right" size={20} color={greytxt} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.RateContainer}>
          <TouchableOpacity style={{ width: "45%" }} activeOpacity={0.3}>
            <View style={styles.RateBox}>
              <View style={{ flexDirection: "row" }}>
                <StarIcon name="star-outlined" size={22} color={greytxt} />
                <StarIcon name="star-outlined" size={22} color={greytxt} />
                <StarIcon name="star-outlined" size={22} color={greytxt} />
                <StarIcon name="star-outlined" size={22} color={greytxt} />
                <StarIcon name="star-outlined" size={22} color={greytxt} />
              </View>
              <Text
                style={{
                  fontFamily: "Montserrat-Medium",
                  color: greytxt,
                  fontSize: 15,
                }}
              >
                Rate Us
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "45%" }} activeOpacity={0.3}>
            <View style={styles.RateBox}>
              <View style={{ flexDirection: "row" }}>
                <EarthIcon name="globe" size={22} color={greytxt} />
              </View>
              <Text
                style={{
                  fontFamily: "Montserrat-Medium",
                  color: greytxt,
                  fontSize: 15,
                }}
              >
                Follow Us
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setmodalVisible(true)}
          >
            <Btn
              title={"Log Out"}
              color={"#473200"}
              backgroundColor={"#FFB916"}
              width={"90%"}
              fontFamily={"Nunito-Bold"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="none"
        onBackdropPress={() => setmodalVisible(false)}
        coverScreen={true}
        transparent={true}
        onRequestClose={() => {
          setmodalVisible(false);
        }}
      >
        <LogoutModal onPress={() => setmodalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  Bg: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 21,
  },
  Bgtxt: {
    color: "white",
    fontSize: 20,
    fontFamily: "Nunito-ExtraBold",
  },
  Namebox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  ListBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#292929",
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 5,
    marginTop: 13,
  },
  RateBox: {
    backgroundColor: "#292929",
    borderRadius: 5,
    height: 85,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  RateContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
    width: "96%",
    alignSelf: "center",
  },
});

export default Profile;
