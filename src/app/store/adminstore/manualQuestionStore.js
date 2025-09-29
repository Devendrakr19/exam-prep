import RefreshToken from "@/app/components/utils/RefreshToken"; 
import { create } from "zustand";

const manualQuestionStore = create((set) => ({
    allQuestionData: [],
    allQuestionLoading: false,
    allUsersList: [],
    allUserLoading: false,
    loading: false,
    deleteLoading: false,
    updateLoading: false,
    deleteUserLoading: false,
    blockUnblockLoading: false,
    scoreData: [],
    scoreLoading: false,

  createQuestion: async (formData) => {
    set({ loading: true });

    try {
      await RefreshToken.post("/admin/manualquestion", formData); 
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
        let res = await RefreshToken.get(`/allquestion?category=${category}&subject=${subject}&topic=${topic}&level=${level}&page=${page}&limit=${limit}`);
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
        let res = await RefreshToken.get("/admin/userslist");
        set({allUsersList:res.data, allUserLoading: false});
        return {success: true};
    } catch (error){
        const errMsg = error.response?.data?.error || "Getting all user failed";
        set({allUserLoading: false});
        return {success: false, error: errMsg}
    }
  },

  deleteQuestion: async (id) =>{
    set({deleteLoading: true});
    try{
      await RefreshToken.delete(`/admin/manualquestion?_id=${id}`);
      set({deleteLoading: false});
      return {success: true};
    } catch (error){
      const errMsg = error.response?.data?.error || "Failed to delete";
      set({deleteLoading: false});
      return {success: false, error: errMsg}
    }
  },
  updateQuestion: async (formData) => {
    set({ updateLoading: true });

    try {
      await RefreshToken.patch("/admin/manualquestion", formData); 
      set({ updateLoading: false });
      return { success: true };
    } catch (error) {
      const errMsg = error.response?.data?.error || "Update failed";
      set({ updateLoading: false });
      return { success: false, error: errMsg };
    }
  },
  deleteUser: async (id) =>{
    set({deleteUserLoading: true});
    try{
      await RefreshToken.delete(`/admin/deleteuser?_id=${id}`);
      set({deleteUserLoading: false});
      return {success: true};
    } catch (error){
      const errMsg = error.response?.data?.error || "Failed to delete";
      set({deleteUserLoading: false});
      return {success: false, error: errMsg}
    }
  },
  blockUnblockUser: async (userId, block) =>{
    set({blockUnblockLoading: true});
    try{
      await RefreshToken.patch(`/admin/blockuser?userId=${userId}&block=${block}`);
      set({blockUnblockLoading: false});
      return {success: true};
    } catch (error){
      const errMsg = error.response?.data?.error || "Failed to block/unblock user";
      set({blockUnblockLoading: false});
      return {success: false, error: errMsg}
    }
  },
  getScoreList: async (userId) =>{
    set({scoreLoading: true});
    try{
      const res = await RefreshToken.get(`/user/score?userId=${userId}`);
      set({scoreData: res.data, scoreLoading: false});
      return {success: true};
    } catch (error){
      const errMsg = error.response?.data?.error || "Failed to fetching score";
      set({scoreLoading: false});
      return {success: false, error: errMsg}
    }
  },
}));

export default manualQuestionStore;
