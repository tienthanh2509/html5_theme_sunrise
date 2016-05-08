<?php

/**
 * Xử lý tài khoản
 *
 * @author phamthanh
 */
class AccountController {

    private $om;

    public function __construct(ObjectManager $om) {
        $this->om = $om;
    }

}
