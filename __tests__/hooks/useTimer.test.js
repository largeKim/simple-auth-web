import { renderHook } from '@testing-library/react-hooks';

import { useTimer } from '../../src/hooks/useTimer';
import { getMilliSecAfterNow } from '../../src/utils/timeUtils';

describe('hooks에 초기값을 넘겨준다', () => {
  it('requestAnimation이 실행된다.', async () => {
    const requestAniFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    const cancelAniFramesSpy = jest.spyOn(window, 'cancelAnimationFrame');

    const { result, waitForNextUpdate } = renderHook(() => useTimer(600));

    expect(result.current.timeRemain).toBe(600);
    result.current.animate(100);
    await waitForNextUpdate();
    expect(requestAniFrameSpy).toBeCalled();
    expect(cancelAniFramesSpy).toBeCalled();
  });
});
