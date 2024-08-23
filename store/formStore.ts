// import { create } from 'zustand';
// import { devtools } from '@zustand/middleware';

// interface FormState {
//     category: string;
//     shorten_url: string;
//     tags: string[];
//     title: string;
//     url: string;
//   }
  
//   interface FormStore {
//     formData: FormState;
//     setFormData: (newData: Partial<FormState>) => void;
//     resetFormData: () => void;
//   }

//   const useFormStore = create<FormStore>(
//     devtools((set) => ({
//       formData: {
//         category: "",
//         shorten_url: "",
//         tags: [],
//         title: "",
//         url: ""
//       },
//       setFormData: (newData) => set((state) => ({
//         formData: { ...state.formData, ...newData }
//       })),
//       resetFormData: () => set(() => ({
//         formData: {
//           category: "",
//           shorten_url: "",
//           tags: [],
//           title: "",
//           url: ""
//         }
//       }))
//     }))
//   );

// export default useFormStore;
