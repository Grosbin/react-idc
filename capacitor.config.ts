import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.admin.idc",
  appName: "IDC-ADMIN",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
