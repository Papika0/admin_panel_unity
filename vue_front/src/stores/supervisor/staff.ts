import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { getSupervisorStaff } from "@/http/staff";
interface StaffMember {
    id: number;
    first_name: string;
    last_name: string;
    parent_id: number;
    user_name: string;
    // Add other properties as needed
  }
export const useSupervisorStaffStore = defineStore("supervisorStaffStore", () => {
    const staff = ref<StaffMember[]>([]);

    // Action to fetch staff data
    async function fetchStaff() {
      try {
        const response = await getSupervisorStaff();
        console.log('Staff:', response.data);
        
        staff.value = response.data; // Assuming the response has a data field
      } catch (error) {
        console.error('Failed to fetch staff:', error);
        // Handle error appropriately
      }
    }
  
    return { staff, fetchStaff };
});