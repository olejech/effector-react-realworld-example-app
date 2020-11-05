import { root, fork, allSettled } from 'effector-root';
import { changeUserDataFx, $error } from './index';

describe('pages/settings ', () => {
  it('return an error if you submit a form with an empty password', async () => {
    const expected = {
      response: {
        data: { errors: { password: ["can't be blank"] } },
      },
    };

    changeUserDataFx.use(() => Promise.reject(expected));

    const scope = fork(root);
    await allSettled(changeUserDataFx, { scope });
    expect(scope.getState($error)).toMatchObject(expected.response.data);
  });
});
