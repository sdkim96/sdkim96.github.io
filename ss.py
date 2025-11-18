import abc
import typing as t
from pydantic import BaseModel, Field


import abc
import typing as t
from pydantic import BaseModel, Field


class IResponse(BaseModel, abc.ABC):

    error: Exception | None = Field(None, exclude=True)
    """ 해당 인터페이스를 구현하는 응답 객체는 Optional한 오류정보를 포함해야합니다."""

    @property
    def is_success(self) -> bool:
        """ 응답이 성공했는지 여부를 반환합니다.
        
        Returns:
            bool: 오류가 없는 경우 True, 오류가 있는 경우 False
        
        """
        return self.error is None

    @abc.abstractmethod
    @classmethod
    def mock(cls) -> t.Self:
        """ 가짜 데이터를 생성합니다.
        
        Returns:
            t.Self: 가짜 데이터가 채워진 응답 객체
        
        """
        pass