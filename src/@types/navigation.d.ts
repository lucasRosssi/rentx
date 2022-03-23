import { AppStackRootParamList } from '../routes/app.stack.routes';
import { AppTabRootParamList } from '../routes/app.tab.routes';
import { AuthRootParamList } from '../routes/auth.routes';

declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends AppStackRootParamList,
				AppTabRootParamList,
				AuthRootParamList {}
	}
}
