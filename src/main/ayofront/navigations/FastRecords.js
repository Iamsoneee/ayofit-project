import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import {FastRecordView,RecordTouch,PlanContainer,PlanTitle,PlanMethodText,PlanMethodCView,PlanMethodC
    ,PlanEndView,PlanEndText,PlanConfirmV,PlanConfirmB,PlanConfirmT,RecordOneView,RecordUseTime,RecordSTime,RecordETime,
    RecordScrollView,RecordUnderC,RecordUpC
} from '../components/fast/FastingStyled';
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import axios from "axios";

const FastRecord = ({navigation : { navigate } }) => {

    const { debuggerHost } = Constants.manifest2.extra.expoGo;
    const uri = `http://${debuggerHost.split(":").shift()}:8080/api/fast`;
    
    const [fastData, setFastData] = useState([]);
    useEffect(() => {
        // Axios GET 요청 설정
        axios
        .get(`${uri}`)
          .then(response => {
            console.log('Data from server:', response.data[0]);
            setFastData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    return(
        <LinearGradient colors={['#f7d7be', '#e7a370']} style={{ flex: 1 }}>
    <RecordScrollView>
        <FastRecordView>
            <RecordUpC>

            </RecordUpC>
            <RecordUnderC>
          {fastData.map((data, index) => (
            <RecordOneView key={index}>
              <RecordUseTime>Using Time : {data.elapsedTime}</RecordUseTime>
              <RecordSTime>Start : {data.confirmStartTime}</RecordSTime>
              <RecordETime>End   : {data.confirmEndTime}</RecordETime>
            </RecordOneView>
          ))}
          </RecordUnderC>
        </FastRecordView>
    </RecordScrollView>
      </LinearGradient>
    );
  };
        


const FastSetRecord = () => {
    return(
<PlanContainer>
<LinearGradient colors={['#f7d7be','#e7a370']}>
<PlanTitle>{"\n"}
</PlanTitle>
<PlanMethodText>
Starting Date
</PlanMethodText>
<PlanMethodCView>
</PlanMethodCView>
<PlanMethodText>
Starting Time
</PlanMethodText>
<PlanMethodCView>
</PlanMethodCView>
<PlanMethodText>
Fasting Duration
</PlanMethodText>
<PlanMethodCView>

</PlanMethodCView>
<PlanEndView>
 <PlanEndText>
    It ends at 
</PlanEndText>
</PlanEndView>
<PlanConfirmV>
<PlanConfirmB>
    <PlanConfirmT>Confirm</PlanConfirmT>
</PlanConfirmB>
</PlanConfirmV>
</LinearGradient>
</PlanContainer>
);
};


const RecordStack = createNativeStackNavigator();

const FastRecordPage = () => (
<RecordStack.Navigator
    screenOptions={{
        headerShown: false,
        headerTintColor: "black",
        headerBackTitleVisible: false,
    }}>
    <RecordStack.Screen name="FastRecordMain" component={FastRecord} />
    <RecordStack.Screen name="FastRecordSet" component={FastSetRecord} />
</RecordStack.Navigator>
);


export default FastRecordPage;