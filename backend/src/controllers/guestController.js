import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { guestService } from '~/services/guestService'

const login = async (req, res, next) => {
  try {
    const result = await guestService.login(req.body)
    /**
          * Xử lý trả về http only cookie cho phía trình duyệt
          * Về maxAge và thư viện ms: https://expressjs.com/en/api.html
          * Đối với maxAge - thời gian sống của Cookie thì sẽ để tối đa 14 ngày, tùy dự án. Lưu ý: Thời gian sống của cookie khác với thời gian sống của token.
        */
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      maxAge: ms('14 days')
    })
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const guestController = {
  login
}
