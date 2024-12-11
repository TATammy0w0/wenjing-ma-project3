import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (formData) => {
        try {
          const res = await fetch(`/api/user/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }

          //return data;
        } catch (error) {
          console.error("Error in mutationFn:", error.message);
          toast.error(error.message);
          throw error; // Ensure the error is propagated
        }
      },
      onSuccess: () => {
        toast.success("Profile updated successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        ]);
      },
      // onError: (error) => {
      //   toast.error(error);
      // },
    });

  return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;