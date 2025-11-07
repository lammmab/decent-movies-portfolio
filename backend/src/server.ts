import { setup } from "./types/setup_globals";
setup();

import router from "./server/app";
router.go();