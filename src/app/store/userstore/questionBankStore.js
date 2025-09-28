import RefreshToken from "@/app/components/utils/RefreshToken"; 
import { create } from "zustand";

const questionBankStore = create((set)=>({
    questionData:[],
    loading: false,
    submitedData: [],
    submitTestLoading: false,


    getFilterQuestons: async ({ category = "", subject = "", topic = "", level = "", page = 1, limit = 10 })=>{
      set({loading: true});
       try{ 
        const res = await RefreshToken.get(`/allquestion?category=${category}&subject=${subject}&topic=${topic}&level=${level}&page=${page}&limit=${limit}`);
        set({questionData:res.data, loading: false});
        return {success: true};
       } catch (error){
         const errMsg = error.response?.data?.error || "Getting all question failed";
        set({loading: false});
        return {success: false, error: errMsg}
       }
    },
    submitTest: async (questions) =>{
       set({submitTestLoading: true});
       try{
         const res = await RefreshToken.post("/user/practiceresult", questions);
         set({submitedData:res.data, submitTestLoading: false});
         return {success: true}
       } catch (error){
        const errMsg = error.response?.data?.error || " submitting all question failed";
        set({submitTestLoading: false})
        return {success: false, error: errMsg}
       }
    },
    resetQuestions: ()=> set({questionData:[]}),
    resetTest: ()=> set({submitedData:[]})
}))

export default questionBankStore;