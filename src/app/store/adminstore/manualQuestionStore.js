import { authConfig } from "@/app/components/utils/authConfig";
import axios from "axios";
import { create } from "zustand";

const manualQuestionStore = create((set) => ({
    allQuestionData: [],
    allQuestionLoading: false,
    allUsersList: [],
    allUserLoading: false,
    loading: false,

  createQuestion: async (formData) => {
    set({ loading: true });

    try {
      await axios.post("/api/admin/manualquestion", formData, authConfig());
      set({ loading: false });
      return { success: true };
    } catch (error) {
      const errMsg = error.response?.data?.error || "Creation failed";
      set({ loading: false });
      return { success: false, error: errMsg };
    }
  },
  getAllQusetions: async ({ category = "", subject = "", topic = "", level = "", page = 1, limit = 10 }) =>{
    set({allQuestionLoading: true});
    try{
        let res = await axios.get(`/api/allquestion?category=${category}&subject=${subject}&topic=${topic}&level=${level}&page=${page}&limit=${limit}`, authConfig());
        set({allQuestionData:res.data, allQuestionLoading: false});
        return {success: true};
    } catch (error){
        const errMsg = error.response?.data?.error || "Getting all question failed";
        set({allQuestionLoading: false});
        return {success: false, error: errMsg}
    }
  },
  getAllUser: async ()=>{
    set({allUserLoading: true});
    try{
        let res = await axios.get("/api/admin/userslist", authConfig());
        set({allUsersList:res.data, allUserLoading: false});
        return {success: true};
    } catch (error){
        const errMsg = error.response?.data?.error || "Getting all user failed";
        set({allUserLoading: false});
        return {success: false, error: errMsg}
    }
  }
}));

export default manualQuestionStore;
