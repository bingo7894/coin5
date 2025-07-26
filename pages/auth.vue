<script setup lang="ts">
import { reactive } from "vue";
import { handleError } from "~/utils/error";
import AuthButton from "~/components/Auth/AuthButton.vue";
import type { FormSubmitEvent } from "#ui/types";
import type { LoginSchema, RegisterSchema } from "~/utils/schemas";
import useStore from "~/composables/useStore";

const items = [
  { slot: "login", label: "Login", description: "Enter your account to login" },
  {
    slot: "register",
    label: "Register",
    description: "Enter your crentials to create your account",
  },
];

const loginForm = reactive({
  email: "",
  password: "",
});

const registerForm = reactive({
  email: "",
  password: "",
  name: "",
});

const { isLoading, toggleLoading, showMessage, showError } = useStore();

async function login(event: FormSubmitEvent<LoginSchema>) {
  try {
    toggleLoading(true);
    console.log("Login: Toggling loading to true."); // Log 1

    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: event.data,
    });

    console.log("Login: API response received:", response); // Log 2

    // Show success message
    showMessage({
      title: "เข้าสู่ระบบสำเร็จ",
      description: "กำลังนำคุณไปยังหน้าหลัก...",
    });
    console.log("Login: Success message displayed."); // Log 3

    // Wait a bit for the message to show
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login: Finished waiting for 1 second."); // Log 4

    // Navigate to /coin page
    await navigateTo("/coin", { replace: true }); // Changed from "/" to "/coin"
    console.log("Login: Navigation to '/coin' initiated."); // Log 5
  } catch (error) {
    console.error("Login: An error occurred during the login process:", error); // Enhanced error log
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
    console.log("Login: Toggling loading to false."); // Log 6
  }
}

async function register(event: FormSubmitEvent<RegisterSchema>) {
  try {
    toggleLoading(true);
    console.log("Register: Toggling loading to true."); // Log 1

    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: event.data,
    });

    console.log("Register: API response received:", response); // Log 2

    // Show success message
    showMessage({
      title: "สมัครสมาชิกสำเร็จ",
      description: "บัญชีของคุณถูกสร้างเรียบร้อยและได้เข้าสู่ระบบแล้ว",
    });
    console.log("Register: Success message displayed."); // Log 3

    // Wait a bit for the message to show
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Register: Finished waiting for 1 second."); // Log 4

    // Navigate to /coin page
    await navigateTo("/coin", { replace: true }); // Changed from "/" to "/coin"
    console.log("Register: Navigation to '/coin' initiated."); // Log 5
  } catch (error: any) {
    console.error(
      "Register: An error occurred during the registration process:",
      error
    ); // Enhanced error log
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
    console.log("Register: Toggling loading to false."); // Log 6
  }
}

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UTabs :items="items" class="w-full max-w-md">
    <template #login="{ item }">
      <UCard>
        <template #header>
          <p
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </template>

        <UForm
          :schema="loginSchema"
          class="space-y-4"
          @submit="login"
          :state="loginForm"
        >
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="loginForm.email"
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              :disabled="isLoading"
            />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <UInput
              v-model="loginForm.password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
              :disabled="isLoading"
            />
          </UFormGroup>
          <div class="space-y-5 mt-5">
            <UButton
              block
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" }}
            </UButton>
            <AuthButton :disabled="isLoading"></AuthButton>
          </div>
        </UForm>
      </UCard>
    </template>

    <template #register="{ item }">
      <UCard>
        <template #header>
          <p
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </template>

        <UForm
          :schema="registerSchema"
          class="space-y-4"
          @submit="register"
          :state="registerForm"
        >
          <UFormGroup label="Name" name="name">
            <UInput
              v-model="registerForm.name"
              placeholder="กรอกชื่อของคุณ"
              :disabled="isLoading"
            />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput
              v-model="registerForm.email"
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              :disabled="isLoading"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="registerForm.password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
              :disabled="isLoading"
            />
          </UFormGroup>
          <div class="space-y-5 mt-5">
            <UButton
              block
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก" }}
            </UButton>
            <AuthButton :disabled="isLoading"></AuthButton>
          </div>
        </UForm>
      </UCard>
    </template>
  </UTabs>
</template>
